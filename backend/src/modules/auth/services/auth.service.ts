import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  AuthResponseDto,
} from '../dto/auth.dto';
import { UserRepository } from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/password.util';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/jwt.util';
import { ConflictException } from '../../../app/exceptions/conflict.exception';
import { UnauthorizedException } from '../../../app/exceptions/unauthorized.exception';
import { NotFoundException } from '../../../app/exceptions/not-found.exception';

export class AuthService {
  private readonly userRepository = new UserRepository();

  /**
   * Register a new user.
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      // throw new Error('User already exists.');
      throw new ConflictException('User already exists.');
    }

    const hashedPassword = await hashPassword(registerDto.password);

    const user = await this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user.id, user.role);

    const refreshToken = generateRefreshToken(user.id);

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login an existing user.
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      // throw new Error('Invalid email or password.');
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    const accessToken = generateAccessToken(user.id, user.role);

    const refreshToken = generateRefreshToken(user.id);

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token.
   */
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    try {
      const payload = verifyToken(refreshTokenDto.refreshToken);

      const user = await this.userRepository.findById(payload.userId);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      if (user.refreshToken !== refreshTokenDto.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      const accessToken = generateAccessToken(user.id, user.role);

      return {
        accessToken,
        refreshToken: refreshTokenDto.refreshToken,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }
  // async refreshToken(
  //   refreshTokenDto: RefreshTokenDto,
  // ): Promise<AuthResponseDto> {
  //   const payload = verifyToken(refreshTokenDto.refreshToken);

  //   const user = await this.userRepository.findById(
  //     payload.userId,
  //   );

  //   if (!user) {
  //     // throw new Error('User not found.');
  //         throw new NotFoundException('User not found.');

  //   }

  //   if (user.refreshToken !== refreshTokenDto.refreshToken) {
  //     // throw new Error('Invalid refresh token.');
  //     throw new UnauthorizedException(
  //   'Invalid refresh token.',
  // );
  //   }

  //   const accessToken = generateAccessToken(
  //     user.id,
  //     user.role,
  //   );

  //   return {
  //     accessToken,
  //     refreshToken: refreshTokenDto.refreshToken,
  //   };
  // }
}
