import mongoose from "mongoose";

export interface INotification {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: Date;
}

const NotificationSchema = new mongoose.Schema<INotification>({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'],
    default: 'info',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Notification = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification;