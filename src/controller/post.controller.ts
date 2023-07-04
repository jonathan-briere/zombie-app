import { Request, Response } from "express";
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from "../schema/post.schema";
import {
  createPost,
  deletePost,
  findAllPost,
  findAndUpdatePost,
  findPost,
  deleteAllPost,
} from "../service/post.service";

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  try {
    const post = await createPost({
      ...body,
      user: userId,
    });

    return res.send(post);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
};

export const updatePostHandler = async (
  req: Request<UpdatePostInput["params"], {}, UpdatePostInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const postId = req.params.postId;
  const update = req.body;

  const post = await findPost({ _id: postId });

  if (!post) return res.sendStatus(404);

  if (post.user.toString() !== userId) return res.sendStatus(403);

  const updatedPost = await findAndUpdatePost({ _id: postId }, update, {
    new: true,
  });

  return res.send(updatedPost);
};

export const getPostHandler = async (
  req: Request<GetPostInput["params"]>,
  res: Response
) => {
  const { postId } = req.params;

  console.log(postId);

  const post = await findPost({ _id: postId });

  if (!post) return res.sendStatus(404);

  return res.send(post);
};

export const getAllPostHandler = async (
  req: Request<GetPostInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const post = await findAllPost({ user: userId });

  if (!post) return res.sendStatus(404);

  return res.send(post);
};

export const deletePostHandler = async (
  req: Request<DeletePostInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { postId } = req.params;

  const post = await findPost({ _id: postId });

  if (!post) return res.sendStatus(404);

  if (post.user.toString() !== userId) return res.sendStatus(403);

  await deletePost({ _id: postId });

  return res.sendStatus(200);
};

export const deleteAllPostHandler = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user._id;

  const posts = await findAllPost({ user: userId });

  if (!(posts.length > 0)) return res.sendStatus(404);

  await deleteAllPost({ user: userId });

  return res.sendStatus(200);
};
