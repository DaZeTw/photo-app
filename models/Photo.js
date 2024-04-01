import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  image: String,
});

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
