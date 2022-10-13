import * as yup from "yup";

const emailRules =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input your full name")
    .min(2, "Please input your full name"),
  email: yup
    .string()
    .required("Required")
    .matches(emailRules, "Please check your email"),
  phone: yup.number().required("Please input your phone number."),
});
