import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().min(5).required("required title"),
  summary: yup.string().min(50).required("required summary"),
  file: yup.mixed(),
  content: yup.string().max(1000).required("required content"),
});
