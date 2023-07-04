import express from "express";
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentHandler,
  updateCommentHandler,
} from "../controller/comment.controller";
import { requireUser } from "../middleware/requireUser";
import validateRequest from "../middleware/validateResource";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  updateCommentSchema,
} from "../schema/comment.schema";

const router = express.Router();

router.get(
  "/comments/:commentId",
  [requireUser, validateRequest(getCommentSchema)],
  getCommentHandler
);

router.post(
  "/posts/:postId/comments",
  [requireUser, validateRequest(createCommentSchema)],
  createCommentHandler
);

router.put(
  "/comments/:commentId",
  [requireUser, validateRequest(updateCommentSchema)],
  updateCommentHandler
);

router.delete(
  "/comments/:commentId",
  [requireUser, validateRequest(deleteCommentSchema)],
  deleteCommentHandler
);

export default router;
