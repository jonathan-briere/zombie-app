import mongoose from "mongoose";
import { PostDocument } from "./post.model";
import { UserDocument } from "./user.model";

export interface CommentDocument extends mongoose.Document {
  user: UserDocument["_id"];
  post: PostDocument["_id"];
  content: string;
  createdAt: Date;
  updateAt: Date;
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
