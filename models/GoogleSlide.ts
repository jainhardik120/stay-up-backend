import mongoose from "mongoose";

export interface IGoogleSlide {
  title: string;
  googleSlideId: string;
}

const GoogleSlideSchema = new mongoose.Schema<IGoogleSlide>({
  title: {
    type: String,
    required: true,
  },
  googleSlideId: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const GoogleSlide = mongoose.models.GoogleSlide || mongoose.model<IGoogleSlide>("GoogleSlide", GoogleSlideSchema);
export default GoogleSlide;