import { type User } from '@/common/types';
import UserModel from './schemas/UserSchema';
import bcrypt from 'bcrypt';
import config from '@/config';

export const registerUser = async (body: User) => {
  const { email, name, password } = body;
  const userSchemaCreate = new UserModel({
    email,
    name,
    password: await bcrypt.hash(password, config.auth.hashSaltTimes)
  });
  return (await userSchemaCreate.save()).toObject();
};
