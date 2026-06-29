import { IUser, UserDocument, UserModel } from '../models/user.model';

export class UserRepository {
  /**
   * Find a user by email.
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).exec();
  }

  /**
   * Find user by id.
   */
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  /**
   * Create a new user.
   */
  async create(user: Pick<IUser, 'email' | 'password'>): Promise<UserDocument> {
    return UserModel.create({
      ...user,
      role: undefined,
      refreshToken: null,
    });
  }

  /**
   * Update refresh token.
   */
  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { refreshToken },
      { new: true },
    ).exec();
  }
}