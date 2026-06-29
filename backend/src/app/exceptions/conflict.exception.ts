// import { HttpException } from './http.exception';

// export class ConflictException extends HttpException {
//   constructor(message = 'Conflict') {
//     super(409, message);
//   }
// }
import { AppError } from './app-error';

export class ConflictException extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}