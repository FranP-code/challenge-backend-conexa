import { isProd } from '../../common/utils';
import config from '../../config';
import mongoose from 'mongoose';
import seed from './seed';

export default async () => {
  await mongoose.connect(config.mongo.url);
  if (!isProd()) {
    await seed();
  }
};
