import { type QueryCondition } from '@/common/types';
import UserModel from './schemas/UserSchema';

export const getUsers = async (condition?: QueryCondition) => {
  return await UserModel.find({ ...condition });
};
