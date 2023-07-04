import express from "express";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "../schema/post.schema";
import {
  createPostHandler,
  deleteAllPostHandler,
  deletePostHandler,
  getAllPostHandler,
  getPostHandler,
  updatePostHandler,
} from "../controller/post.controller";
import { requireUser } from "../middleware/requireUser";
import validateRequest from "../middleware/validateResource";

const router = express.Router();

router.get("/posts", requireUser, getAllPostHandler);
router.get(
  "/posts/:postId",
  [requireUser, validateRequest(getPostSchema)],
  getPostHandler
);

router.post(
  "/posts",
  [requireUser, validateRequest(createPostSchema)],
  createPostHandler
);

router.put(
  "/posts/:postId",
  [requireUser, validateRequest(updatePostSchema)],
  updatePostHandler
);

router.delete(
  "/posts/:postId",
  [requireUser, validateRequest(deletePostSchema)],
  deletePostHandler
);

router.delete(
  "/posts",
  requireUser,
  deleteAllPostHandler
);

export default router;
