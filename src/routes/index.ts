import { Express, Request, Response } from "express";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";

import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";
import { requireUser } from "../middleware/requireUser";
import validateRequest from "../middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductHandler,
  getProductHandler,
  updateProductHandler,
} from "../controller/product.controller";

export default (app: Express) => {
  app.get("/api/v1/status", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  app.get("/api/sessions", requireUser, getUserSessionHandler);

  app.post(
    "/api/sessions",
    validateRequest(createSessionSchema),
    createSessionHandler
  );

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get("/api/products", requireUser, getAllProductHandler);
  app.get(
    "/api/products/:productId",
    [requireUser, validateRequest(getProductSchema)],
    getProductHandler
  );

  app.post(
    "/api/products",
    [requireUser, validateRequest(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validateRequest(updateProductSchema)],
    updateProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateRequest(deleteProductSchema)],
    deleteProductHandler
  );

  app.use("/api", postRoutes);
  app.use("/api", commentRoutes);
};
