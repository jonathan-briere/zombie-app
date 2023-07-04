import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import CommentModel, { CommentDocument } from "../model/comment.model";
import PostModel from "../model/post.model";

export const createComment = (
  input: DocumentDefinition<Omit<CommentDocument, "createdAt" | "updateAt">>
) =>
  CommentModel.create(input).then(async (comment) => {
    await PostModel.findByIdAndUpdate(
      comment.post,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    return comment;
  });

export const findComment = (
  query: FilterQuery<CommentDocument>,
  options: QueryOptions = { lean: true }
) => CommentModel.findOne(query, {}, options);

export const findAndUpdateComment = (
  query: FilterQuery<CommentDocument>,
  update: UpdateQuery<CommentDocument>,
  options: QueryOptions
) => CommentModel.findOneAndUpdate(query, update, options);

export const deleteComment = (query: FilterQuery<CommentDocument>) =>
  CommentModel.deleteOne(query);
