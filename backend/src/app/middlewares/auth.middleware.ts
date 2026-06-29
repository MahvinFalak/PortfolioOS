import { NextFunction, Request, Response } from 'express';

import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { verifyToken } from '../../modules/auth/utils/jwt.util';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authorizationHeader =
      req.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException(
        'Authorization header is missing.',
      );
    }

    const [scheme, token] =
      authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization header.',
      );
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(
      error instanceof UnauthorizedException
        ? error
        : new UnauthorizedException(
            'Invalid or expired access token.',
          ),
    );
  }
};