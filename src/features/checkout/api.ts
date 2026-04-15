import { BaseService } from "@/lib/baseServices";

export const Checkoutservice = new BaseService("/checkout", "checkout");

export const CheckoutAPI = {
  check: (data:object) => Checkoutservice.create(data),
};
