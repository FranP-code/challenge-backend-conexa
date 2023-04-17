import seedData from './seed.data';
import User from '../schemas/UserSchema';
export default async () => {
  await User.insertMany(seedData(100));
};
