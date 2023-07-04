import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import PostModel, { PostDocument } from "../model/post.model";

export const createPost = (
  input: DocumentDefinition<
    Omit<PostDocument, "createdAt" | "updateAt" | "comments">
  >
) => PostModel.create(input);

export const findPost = (
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) => PostModel.findOne(query, {}, options).populate("comments");

export const findAllPost = (
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) => PostModel.find(query, {}, options).populate("comments");

export const findAndUpdatePost = (
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) => PostModel.findOneAndUpdate(query, update, options);

export const deletePost = (query: FilterQuery<PostDocument>) =>
  PostModel.deleteOne(query);

export const deleteAllPost = (query: FilterQuery<PostDocument>) =>
  PostModel.deleteMany(query);
