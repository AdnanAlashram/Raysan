import * as Yup from "yup";

export const CheckoutVal = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  phone: Yup.string().required("هذا الحقل مطلوب"),
  addressId: Yup.string().required("هذا الحقل مطلوب"),
  note: Yup.string().required("هذا الحقل مطلوب"),
});
