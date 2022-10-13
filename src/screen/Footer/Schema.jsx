import * as yup from "yup";

const emailRules =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const contactFormSchema = yup.object().shape({
  name: yup.string().required("Required").min(2, "Nhap do"),
  email: yup.string().required("Required").matches(emailRules, "Sai Form roi"),
  phone: yup.string().required("Required").length(10, "du 10 so thi do"),
});
