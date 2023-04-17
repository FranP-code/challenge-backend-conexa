import { type User } from '@/common/types';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>({
  email: {
    required: true,
    type: String,
    unique: true
  },
  name: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
