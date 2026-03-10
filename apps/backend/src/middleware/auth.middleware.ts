import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model.js';
import { AppError, asyncHandler } from './error.middleware.js';
import { config } from '../config/index.js';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError('You are not logged in. Please log in to get access.', 401, 'UNAUTHORIZED');
    }

    const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;

    const currentUser = await User.findById(decoded.userId).select('-password');
    if (!currentUser) {
      throw new AppError('The user belonging to this token no longer exists.', 401, 'USER_NOT_FOUND');
    }

    if (currentUser.isBlocked) {
      throw new AppError('Your account has been blocked. Please contact support.', 403, 'ACCOUNT_BLOCKED');
    }

    req.user = currentUser;
    next();
  }
);

export const optionalAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
      const currentUser = await User.findById(decoded.userId).select('-password');
      
      if (currentUser && !currentUser.isBlocked) {
        req.user = currentUser;
      }
    } catch {
      // Token invalid or expired, continue without user
    }

    next();
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('You are not logged in.', 401, 'UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403, 'FORBIDDEN')
      );
    }

    next();
  };
};

export const isAdmin = authorize('admin');
