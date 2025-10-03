export type ProductType = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensionsType;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReviewType[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMetaType;
  images: Array<string>;
  thumbnail: string;
};

type ProductDimensionsType = {
  width: number;
  height: number;
  depth: number;
};

type ProductReviewType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductMetaType = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type ProductsApiResponseType = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductQueryParamsType = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
};

export type ProductsQueryResultType = {
  data: ProductsApiResponseType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export type CategoryApiResponseType = {
  slug: string;
  name: string;
  url: string;
};
