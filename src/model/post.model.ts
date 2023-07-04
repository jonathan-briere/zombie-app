import mongoose from "mongoose";
import { CommentDocument } from "./comment.model";
import { UserDocument } from "./user.model";

export interface PostDocument extends mongoose.Document {
  user: UserDocument["_id"];
  comments: CommentDocument["_id"][];
  title: string;
  images: string[];
  createdAt: Date;
  updateAt: Date;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    title: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);


const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
