import * as yup from "yup";

export const basicSchem = yup.object().shape({
  email: yup.string().email("please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
  userName: yup.string().min(5).required("you must enter a userName"),
});
