import * as yup from "yup";

const emailRules =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const contactFormSchema = yup.object().shape({
  name: yup.string().email("Nhap ten vo").required("Required"),
  email: yup
    .string()
    .email("Nhap email vao")
    .required("Required")
    .matches(emailRules, "Sai Form roi"),
  phone: yup
    .string()
    .email("Nhap so vao")
    .required("Required")
    .min(11, "maximun is 11")
    .max(11),
});
