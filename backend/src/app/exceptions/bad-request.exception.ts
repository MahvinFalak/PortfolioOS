// import { HttpException } from './http.exception';

// export class BadRequestException extends HttpException {
//   constructor(message = 'Bad Request') {
//     super(400, message);
//   }
// }
import { AppError } from './app-error';

export class BadRequestException extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}
