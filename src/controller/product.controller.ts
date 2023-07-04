import { Request, Response } from "express";
import log from "../utils/logger";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAllProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  try {
    const product = await createProduct({
      ...body,
      user: userId,
    });

    return res.send(product);
  } catch (e: any) {
    log.error(e);
    return res.status(422).send(e.message);
  }
};

export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput['body']>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  if (product.user.toString() !== userId) return res.sendStatus(403);

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
};

export const getProductHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  return res.send(product);
};

export const getAllProductHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const product = await findAllProduct({ user: userId });

  if (!product) return res.sendStatus(404);

  return res.send(product);
};

export const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ _id: productId });

  if (!product) return res.sendStatus(404);
  if (product.user.toString() !== userId) return res.sendStatus(403);

  const deleted = await deleteProduct({ _id: productId });

  return res.sendStatus(200);
};
