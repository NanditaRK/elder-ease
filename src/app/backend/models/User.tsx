// backend/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  role: 'user' | 'caregiver';
}

const userSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'caregiver'], default: 'user' },
});

export default mongoose.model<IUser>('User', userSchema);
