import User from '../schemas/UserSchema';
import seedData from './seed.data';
export default async () => {
  await User.deleteMany();
  await User.insertMany(seedData(20));
};
