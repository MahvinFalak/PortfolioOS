export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}
/**
 * Refresh Token Request DTO
 */
export interface RefreshTokenDto {
  refreshToken: string;
}
