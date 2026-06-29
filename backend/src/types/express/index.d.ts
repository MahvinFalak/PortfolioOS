import { AuthTokenPayload } from '../../modules/auth/utils/jwt.util';

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export {};
