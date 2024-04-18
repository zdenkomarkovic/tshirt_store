import { Schema } from "mongoose";

export interface CreateProductParams {
  title: string;
  price: number;
  discount: number;
  stock: number;
  image: File[];
  features: string;
  description: string;
  path: string;
}

export interface DeleteProductParams {
  productId: string;
  path: string;
}

export interface EditProductParams {
  productId: string;
  title: string;
  price: number;
  discount: number;
  stock: number;
  image: File[];
  features: string;
  description: string;
  path: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface GetProductByIdParams {
  productId: string;
}
