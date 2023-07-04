import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    content: string({
      required_error: "Title is required",
    }),
  }),
};

const postParams = {
  params: object({
    postId: string({
      required_error: "productId is required",
    }),
  }),
};

const commentParams = {
  params: object({
    commentId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createCommentSchema = object({
  ...payload,
  ...postParams,
});

export const updateCommentSchema = object({
  ...payload,
  ...commentParams,
});

export const deleteCommentSchema = object({
  ...commentParams,
});

export const getCommentSchema = object({
  ...commentParams,
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;
export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>;
export type GetCommentInput = TypeOf<typeof getCommentSchema>;
