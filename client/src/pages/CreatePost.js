import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, useFormik } from "formik";
import { postSchema } from "../Schemas/Post";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const CreatePost = () => {
  const navigate = useNavigate();
  const postForm = useFormik({
    initialValues: {
      title: "",
      summary: "",
      content: "",
      file: null,
    },
    validationSchema: postSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted"); // Add this line

      console.log(values.title);
      console.log(values.summary);
      console.log(values.file); // This will show the File object
      console.log(values.content);

      resetForm();
    },
  });
  const createPost = () => {
    if (Object.keys(postForm.errors).length === 0 && postForm.values.file) {
      const formData = new FormData();
      formData.append("title", postForm.values.title);
      formData.append("summary", postForm.values.summary);
      formData.append("content", postForm.values.content);
      formData.append("file", postForm.values.file);
      axios
        .post("http://localhost:3001/post/createPost", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for multer on the server
          },
        })
        .then((res) => {
          console.log(res);
          toast("you created the post");
          navigate("/");
        });
    } else {
      toast("Validation errors found ");
    }
  };
  return (
    <form onSubmit={postForm.handleSubmit}>
      <div className="mt-4 space-y-4 px-4">
        <input
          name="title" // Add name attribute
          onBlur={postForm.handleBlur}
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Title"
          value={postForm.values.title}
          onChange={postForm.handleChange}
        />
        {postForm.errors.title && postForm.touched.title && (
          <p>{postForm.errors.title}</p>
        )}
        <input
          name="summary"
          className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="summary"
          value={postForm.values.summary}
          onChange={postForm.handleChange}
          onBlur={postForm.handleBlur}
        />
        <div class="relative">
          <label
            for="fileInput"
            class="cursor-pointer border bg-gray-800 text-white  font-semibold py-2 px-4 rounded-lg"
          >
            Add File
          </label>
          <input
            id="fileInput"
            name="file" // Add name attribute
            type="file"
            className="hidden absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            accept="*"
            onBlur={postForm.handleBlur}
            onChange={(event) => {
              postForm.setFieldValue("file", event.currentTarget.files[0]);
            }}
          />
        </div>
        <ReactQuill
          value={postForm.values.content}
          modules={modules}
          formats={formats}
          onChange={(value) => {
            postForm.setFieldValue("content", value);
          }}
        />
        <button type="submit" onClick={createPost}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
