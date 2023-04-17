import mongoose from 'mongoose';
import config from '../../config';
import { isProd } from '../../common/utils';
import seed from './seed';

export default async () => {
  await mongoose.connect(config.mongo.url as string);
  if (!isProd()) {
    await seed();
  }
};
