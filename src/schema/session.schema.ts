import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    password: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createSessionSchema>;
