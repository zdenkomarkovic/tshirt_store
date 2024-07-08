export interface CreateProductParams {
  title: string;
  category: string;
  // brand: string;
  price: number;
  discount: number;
  stock: number;
  views: number;
  image: File[];
  features: string;
  description: string;
  hidden: boolean;
  showOnLandingPage: boolean;
  productCode: string;
  // avaibility: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  path: string;
}

export interface DeleteProductParams {
  productId: string;
  path: string;
}

export interface EditProductParams {
  productId: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
  image: File[];
  features: string;
  description: string;
  hidden: boolean;
  showOnLandingPage: boolean;
  productCode: string;
  avaibility: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  path: string;
}
export interface ToggleProductParams {
  productId: string;
  hidden: boolean;
  path: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface GetProductByIdParams {
  productId: string;
  views: number;
}
export interface GetProductsParams {
  filter: string;
}

export interface CreateCategoryParams {
  title: string;
  linked: string;
  image: File[];
  description: string;
  path: string;
}

export interface DeleteCategoryParams {
  categoryId: string;
  path: string;
}

export interface EditCategoryParams {
  categoryId: string;
  title: string;
  linked: string;
  image: File[];
  description: string;
  path: string;
}

export interface GetCategoryByIdParams {
  categoryId: string;
}

export interface CreateBrandParams {
  title: string;
  image: File[];
  path: string;
}

export interface DeleteBrandParams {
  brandId: string;
  path: string;
}

export interface EditBrandParams {
  brandId: string;
  title: string;
  image: File[];
  path: string;
}

export interface GetBrandByIdParams {
  brandId: string;
}

export interface CreateSliderParams {
  title: string;
  subtitle: string;
  image: File[];
  link: string;
  path: string;
}

export interface DeleteSliderParams {
  sliderId: string;
  path: string;
}

export interface EditSliderParams {
  sliderId: string;
  title: string;
  subtitle: string;
  image: File[];
  link: string;
  path: string;
}

export interface GetSliderByIdParams {
  sliderId: string;
}
export interface CreateColectionParams {
  title: string;
  subtitle: string;
  image: File[];
  link: string;
  path: string;
}

export interface DeleteColectionParams {
  colectionId: string;
  path: string;
}

export interface EditColectionParams {
  colectionId: string;
  title: string;
  subtitle: string;
  image: File[];
  link: string;
  path: string;
}

export interface GetColectionByIdParams {
  colectionId: string;
}
export interface CreateVisibilityParams {
  title: string;
  hidden: boolean;
  path: string;
}

export interface DeleteVisibilityParams {
  visibilityId: string;
  path: string;
}

export interface ToggleVisibilityParams {
  visibilityId: string;
  hidden: boolean;
  path: string;
}
