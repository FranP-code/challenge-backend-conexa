import seedData from './seed.data';
import User from '../schemas/UserSchema';
export default async () => {
  await User.deleteMany();
  await User.insertMany(seedData(3));
};
