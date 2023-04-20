import { type Options, type QueryCondition } from '@/common/types';
import UserModel from './schemas/UserSchema';

export const getUsers = async (
  condition?: QueryCondition,
  options?: Options
) => {
  const limit = options?.limit ? parseInt(options.limit, 10) : undefined;
  const page = options?.page && parseInt(options.page, 10);
  const skip = limit && page ? (page > 0 ? page - 1 : page) * limit : undefined;
  const [users, usersCount] = await Promise.all([
    UserModel.find({ ...condition }, null, { ...{ limit, skip } }),
    (async () => {
      if (condition?._id) {
        return 1;
      }
      return UserModel.countDocuments({ ...condition });
    })()
  ]);
  return {
    lastPage: !!(
      skip &&
      page &&
      limit &&
      page >= Math.ceil(usersCount / limit)
    ),
    users
  };
};
