import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    throw new Error('Token must be of type Bearer, malformated token');
  }

  const isValidToken = jwt.verify(tokenValue, 'pacoca');

  if (!isValidToken) {
    throw new Error('Invalid token');
  }

  next();
};

export default authMiddleware;
