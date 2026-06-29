import { NextFunction, Request, Response } from 'express';

// import { BadRequestException } from '../../../app/exceptions/bad-request.exception';
import { LoginDto, RegisterDto , RefreshTokenDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema
} from '../validations/auth.validation';
import { validateSchema } from '../../../app/validators/validate-schema';

export class AuthController {
  private readonly authService = new AuthService();

  /**
   * Register a new user.
   */
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // const validationResult = registerSchema.safeParse(req.body);

      // if (!validationResult.success) {
      //   throw new BadRequestException(
      //     validationResult.error.issues[0].message,
      //   );
      // }

      // const registerDto: RegisterDto = validationResult.data;

      const registerDto: RegisterDto = validateSchema(
              registerSchema,
              req.body,
              );

      const authResponse =
        await this.authService.register(registerDto);

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: authResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login an existing user.
   */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // const validationResult = loginSchema.safeParse(req.body);

      // if (!validationResult.success) {
      //   throw new BadRequestException(
      //     validationResult.error.issues[0].message,
      //   );
      // }

      // const loginDto: LoginDto = validationResult.data;

      const loginDto: LoginDto = validateSchema(
            loginSchema,
            req.body,
            );

      const authResponse =
        await this.authService.login(loginDto);

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: authResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
 * Refresh Access Token
 */
public refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // const validationResult =
    //   refreshTokenSchema.safeParse(req.body);

    // if (!validationResult.success) {
    //   throw new BadRequestException(
    //     validationResult.error.issues[0].message,
    //   );
    // }

    // const refreshDto: RefreshTokenDto =
    //   validationResult.data;

    const refreshDto: RefreshTokenDto = validateSchema(
          refreshTokenSchema,
          req.body,
          );

    const authResponse =
      await this.authService.refreshToken(
        refreshDto,
      );

    res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully.',
      data: authResponse,
    });
  } catch (error) {
    next(error);
  }
};
}