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
