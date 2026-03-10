import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { config } from '../config/index.js';
import { sendSuccess, sendMessage } from '../utils/response.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema, refreshTokenSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = Router();

const generateTokens = (userId: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { userId, email, role },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiry }
  );
  
  const refreshToken = jwt.sign(
    { userId, email, role },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiry }
  );
  
  return { accessToken, refreshToken };
};

// Register
router.post('/register', validate(registerSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400, 'EMAIL_EXISTS');
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    phone,
  });

  const { accessToken, refreshToken } = generateTokens(
    user._id.toString(),
    user.email,
    user.role
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  }, 201);
}));

// Login
router.post('/login', validate(loginSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400, 'MISSING_CREDENTIALS');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  if (user.isBlocked) {
    throw new AppError('Your account has been blocked', 403, 'ACCOUNT_BLOCKED');
  }

  const { accessToken, refreshToken } = generateTokens(
    user._id.toString(),
    user.email,
    user.role
  );

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  });
}));

// Logout
router.post('/logout', authenticate, asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined });

  sendMessage(res, 'Logged out successfully');
}));

// Refresh Token
router.post('/refresh', validate(refreshTokenSchema), asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token required', 400, 'MISSING_REFRESH_TOKEN');
  }

  const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
  }

  const tokens = generateTokens(user._id.toString(), user.email, user.role);

  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, tokens);
}));

// Forgot Password
router.post('/forgot-password', validate(forgotPasswordSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if email exists
    sendMessage(res, 'If email exists, password reset link will be sent');
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save({ validateBeforeSave: false });

  // TODO: Send email with reset link
  // const resetUrl = `${config.frontendUrl}/reset-password/${resetToken}`;

  sendSuccess(res, {
    message: 'If email exists, password reset link will be sent',
    ...(config.env === 'development' && { resetToken }),
  });
}));

// Reset Password
router.post('/reset-password/:token', validate(resetPasswordSchema), asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token', 400, 'INVALID_RESET_TOKEN');
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.refreshToken = undefined;
  await user.save();

  sendMessage(res, 'Password reset successful');
}));

// Get Current User
router.get('/me', authenticate, asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, { user: req.user });
}));

export default router;
