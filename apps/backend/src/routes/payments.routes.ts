import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Order } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { config } from '../config/index.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

function getRazorpay() {
  if (!config.razorpay.keyId || config.razorpay.keyId === 'rzp_test_xxxxxxxxxxxx') {
    throw new AppError('Razorpay is not configured. Set valid RAZORPAY_KEY_ID in .env', 503, 'PAYMENT_NOT_CONFIGURED');
  }
  return new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
  });
}

// Create Razorpay order
router.post('/create-order', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
    paymentStatus: 'pending',
    paymentMethod: 'razorpay',
  });

  if (!order) {
    throw new AppError('Order not found or already paid', 404, 'ORDER_NOT_FOUND');
  }

  const razorpayOrder = await getRazorpay().orders.create({
    amount: Math.round(order.total * 100), // Amount in paise
    currency: 'INR',
    receipt: order.orderNumber,
    notes: {
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
    },
  });

  order.razorpay = {
    orderId: razorpayOrder.id,
  };
  await order.save();

  sendSuccess(res, {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    key: config.razorpay.keyId,
  });
}));

// Verify payment
router.post('/verify', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
    'razorpay.orderId': razorpayOrderId,
  });

  if (!order) {
    throw new AppError('Order not found', 404, 'ORDER_NOT_FOUND');
  }

  // Verify signature
  const body = razorpayOrderId + '|' + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.keySecret)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    order.paymentStatus = 'failed';
    order.timeline.push({
      status: 'payment_failed',
      message: 'Payment verification failed',
      timestamp: new Date(),
    });
    await order.save();

    throw new AppError('Payment verification failed', 400, 'PAYMENT_VERIFICATION_FAILED');
  }

  // Update order
  order.razorpay!.paymentId = razorpayPaymentId;
  order.razorpay!.signature = razorpaySignature;
  order.paymentStatus = 'paid';
  order.status = 'confirmed';
  order.timeline.push({
    status: 'paid',
    message: 'Payment received successfully',
    timestamp: new Date(),
  });
  order.timeline.push({
    status: 'confirmed',
    message: 'Order confirmed',
    timestamp: new Date(),
  });
  await order.save();

  sendSuccess(res, { order });
}));

// Webhook handler (receives raw body from express.raw() middleware in app.ts)
router.post('/webhook', asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;

  if (!signature) {
    throw new AppError('Missing signature', 400, 'MISSING_SIGNATURE');
  }

  // Use raw body buffer for signature verification
  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.webhookSecret)
    .update(rawBody)
    .digest('hex');

  if (expectedSignature !== signature) {
    throw new AppError('Invalid signature', 400, 'INVALID_SIGNATURE');
  }

  const payload = Buffer.isBuffer(req.body) ? JSON.parse(req.body.toString('utf8')) : req.body;
  const event = payload.event;

  const eventPayload = payload.payload;

  switch (event) {
    case 'payment.captured': {
      const paymentEntity = eventPayload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;

      const order = await Order.findOne({ 'razorpay.orderId': razorpayOrderId });
      if (order && order.paymentStatus !== 'paid') {
        order.razorpay!.paymentId = paymentEntity.id;
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        order.timeline.push({
          status: 'paid',
          message: 'Payment captured via webhook',
          timestamp: new Date(),
        });
        order.timeline.push({
          status: 'confirmed',
          message: 'Order confirmed',
          timestamp: new Date(),
        });
        await order.save();
      }
      break;
    }

    case 'payment.failed': {
      const paymentEntity = eventPayload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;

      const order = await Order.findOne({ 'razorpay.orderId': razorpayOrderId });
      if (order && order.paymentStatus === 'pending') {
        order.paymentStatus = 'failed';
        order.timeline.push({
          status: 'payment_failed',
          message: `Payment failed: ${paymentEntity.error_description || 'Unknown error'}`,
          timestamp: new Date(),
        });
        await order.save();
      }
      break;
    }

    case 'refund.created': {
      const refundEntity = eventPayload.refund.entity;
      const paymentId = refundEntity.payment_id;

      const order = await Order.findOne({ 'razorpay.paymentId': paymentId });
      if (order) {
        order.paymentStatus = 'refunded';
        order.timeline.push({
          status: 'refunded',
          message: `Refund of ₹${refundEntity.amount / 100} initiated`,
          timestamp: new Date(),
        });
        await order.save();
      }
      break;
    }
  }

  sendSuccess(res, null);
}));

export default router;
