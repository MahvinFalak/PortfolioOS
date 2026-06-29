// import { HttpException } from './http.exception';

// export class NotFoundException extends HttpException {
//   constructor(message = 'Resource Not Found') {
//     super(404, message);
//   }
// }
import { AppError } from './app-error';

export class NotFoundException extends AppError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}