import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProductModel, { ProductDocument } from "../model/product.model";

export const createProduct = async (
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updateAt">>
) => ProductModel.create(input);

export const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => ProductModel.findOne(query, {}, options);

export const findAllProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => ProductModel.find(query, {}, options);

export const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => ProductModel.findOneAndUpdate(query, update, options);

export const deleteProduct = async (query: FilterQuery<ProductDocument>) =>
  ProductModel.deleteOne(query);
