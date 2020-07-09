import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    throw new Error('Authorization header is mandatory.');
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (!(tokenType === 'Bearer')) {
    throw new Error('JWT token must be of type Bearer, malformated token');
  }

  try {
    const decoded = jwt.verify(tokenValue, SECRET_KEY);

    const { sub } = decoded as JwtPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT Token');
  }
};

export default authMiddleware;
