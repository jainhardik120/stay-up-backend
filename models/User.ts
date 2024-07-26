import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  teams: string[];
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  teams: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;