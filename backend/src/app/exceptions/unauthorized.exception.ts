// import { HttpException } from './http.exception';

// export class UnauthorizedException extends HttpException {
//   constructor(message = 'Unauthorized') {
//     super(401, message);
//   }
// }
import { AppError } from './app-error';

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}
