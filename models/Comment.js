import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  photoId: String,
  text: String,
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
