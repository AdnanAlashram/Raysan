import { BaseService } from "@/lib/baseServices";

export const Productervice = new BaseService("/products", "products");

export const ProductAPI = {
  list: () => Productervice.list({ }),
};
