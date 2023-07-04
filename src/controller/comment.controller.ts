import { Request, Response } from "express";
import {
  CreateCommentInput,
  DeleteCommentInput,
  GetCommentInput,
  UpdateCommentInput,
} from "../schema/comment.schema";
import {
  createComment,
  deleteComment,
  findAndUpdateComment,
  findComment,
} from "../service/comment.service";
import { findPost } from "../service/post.service";

export const createCommentHandler = async (
  req: Request<CreateCommentInput["params"], {}, CreateCommentInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const postId = req.params.postId;

  const body = req.body;

  const post = await findPost({ _id: postId });

  if (!post) return res.sendStatus(404);

  try {
    const comment = await createComment({
      ...body,
      user: userId,
      post: postId,
    });

    return res.send(comment);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
};

export const getCommentHandler = async (
  req: Request<GetCommentInput["params"]>,
  res: Response
) => {
  const { commentId } = req.params;

  const comment = await findComment({ _id: commentId });

  if (!comment) return res.sendStatus(404);

  return res.send(comment);
};

export const updateCommentHandler = async (
  req: Request<UpdateCommentInput["params"], {}, UpdateCommentInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { commentId } = req.params;

  const update = req.body;

  const comment = await findComment({ _id: commentId });

  if (!comment) return res.sendStatus(404);
  if (comment.user.toString() !== userId) return res.sendStatus(403);

  const updatedComment = await findAndUpdateComment(
    { _id: commentId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedComment);
};

export const deleteCommentHandler = async (
  req: Request<DeleteCommentInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { commentId } = req.params;

  const comment = await findComment({ _id: commentId });

  if (!comment) return res.sendStatus(404);
  if (comment.user.toString() !== userId) return res.sendStatus(403);

  await deleteComment({ _id: commentId });

  return res.sendStatus(200);
};
