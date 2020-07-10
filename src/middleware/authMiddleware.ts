import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import AppError from '../errors/AppError';
import AppErrorTypes from '../errors/types/AppErrorTypes';

import { SECRET_KEY } from '../configs/auth';

interface JwtPayload {
  iat: number;
  exp: number;
  sub: string;
}

const authMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError({
      message: 'Authorization header is mandatory.',
      type: AppErrorTypes.UNATHORIZED,
    });
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (!(tokenType === 'Bearer')) {
    throw new AppError({
      message: 'JWT token must be of type Bearer, malformated token',
      type: AppErrorTypes.UNATHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(tokenValue, SECRET_KEY);

    const { sub } = decoded as JwtPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError({
      message: 'Invalid JWT Token',
      type: AppErrorTypes.UNATHORIZED,
    });
  }
};

export default authMiddleware;
