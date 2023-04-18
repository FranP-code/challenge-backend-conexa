import { type User } from '@/common/types';
import UserModel from './schemas/UserSchema';

export const registerUser = async (body: User) => {
  const { email, name, password } = body;
  const userSchemaCreate = new UserModel({
    email,
    name,
    password
  });
  return userSchemaCreate.save();
  // return await UserModel.create({ email, name, password });
};
