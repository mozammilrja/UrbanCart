import { Router, Request, Response } from 'express';
import { Address } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { sendSuccess, sendMessage } from '../utils/response.js';
import { validate } from '../middleware/validate.middleware.js';
import { createAddressSchema, updateAddressSchema } from '../validators/address.validator.js';

const router: ReturnType<typeof Router> = Router();

router.use(authenticate);

// Get all addresses
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const addresses = await Address.find({ user: req.user._id })
    .sort('-isDefault -createdAt')
    .lean();

  sendSuccess(res, { addresses });
}));

// Get single address
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).lean();

  if (!address) {
    throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  sendSuccess(res, { address });
}));

// Create address
router.post('/', validate(createAddressSchema), asyncHandler(async (req: Request, res: Response) => {
  const {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    landmark,
    type,
    isDefault,
  } = req.body;

  const addressCount = await Address.countDocuments({ user: req.user._id });
  const shouldBeDefault = addressCount === 0 || isDefault;

  const address = await Address.create({
    user: req.user._id,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    landmark,
    type,
    isDefault: shouldBeDefault,
  });

  sendSuccess(res, { address }, 201);
}));

// Update address
router.patch('/:id', validate(updateAddressSchema), asyncHandler(async (req: Request, res: Response) => {
  const {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    landmark,
    type,
    isDefault,
  } = req.body;

  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  Object.assign(address, {
    fullName: fullName ?? address.fullName,
    phone: phone ?? address.phone,
    addressLine1: addressLine1 ?? address.addressLine1,
    addressLine2: addressLine2 ?? address.addressLine2,
    city: city ?? address.city,
    state: state ?? address.state,
    pincode: pincode ?? address.pincode,
    landmark: landmark ?? address.landmark,
    type: type ?? address.type,
    isDefault: isDefault ?? address.isDefault,
  });

  await address.save();

  sendSuccess(res, { address });
}));

// Delete address
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  // If deleted address was default, set another as default
  if (address.isDefault) {
    await Address.findOneAndUpdate(
      { user: req.user._id },
      { isDefault: true }
    );
  }

  sendMessage(res, 'Address deleted');
}));

// Set as default
router.post('/:id/default', asyncHandler(async (req: Request, res: Response) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    throw new AppError('Address not found', 404, 'ADDRESS_NOT_FOUND');
  }

  address.isDefault = true;
  await address.save();

  sendSuccess(res, { address });
}));

export default router;
