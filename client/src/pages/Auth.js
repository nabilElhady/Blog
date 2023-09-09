import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { basicSchem } from "../Schemas/UserFront";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setlogin } from "../state";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.persistedReducer.user);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const changeAuth = () => {
    setState(!state);
  };
  const basicForm = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: basicSchem,
  });
  const email = basicForm.values.email;
  const userName = basicForm.values.userName;
  const password = basicForm.values.password;
  const RegisterHandler = () => {
    axios
      .post("http://localhost:3001/Auth/Register", {
        email,
        userName,
        password,
      })
      .then((response) => {
        console.log(response);
        state(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message == "Email is already in use") {
          console.log(err.response.data.message);
          toast("email already in use");
        }
      });
  };
  const loginHandler = () => {
    axios
      .post("http://localhost:3001/Auth/Login", {
        email,
        password,
      })
      .then((response) => {
        navigate("/");

        console.log(response);
        dispatch(
          setlogin({
            user: response.data.existingUser,
            token: response.data.token,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message == "wrong info") {
          console.log(err.response.data.message);
          toast("wrong info");
        }
      });
  };
  return (
    <div
      onClick={() => {
        console.log(user);
      }}
      className="w-full flex flex-col items-center justify-center h-screen"
    >
      {state && (
        <div class="w-72 mt-4">
          <div class="relative h-10 w-full min-w-[200px]">
            <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <input
              onChange={basicForm.handleChange}
              value={basicForm.values.userName}
              onBlur={basicForm.handleBlur}
              id="userName"
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label class=" before:content[' '] after:content[' '] text-gray-800 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              userName
            </label>
          </div>
        </div>
      )}
      <div class="w-72 mt-4">
        <div class="relative h-10 w-full min-w-[200px]">
          <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
              />
            </svg>
          </div>
          <input
            onChange={basicForm.handleChange}
            value={basicForm.values.email}
            onBlur={basicForm.handleBlur}
            id="email"
            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            email
          </label>
        </div>
      </div>
      {basicForm.errors.email && basicForm.touched.email && (
        <div className="text-red-400">{basicForm.errors.email}</div>
      )}
      <div class="w-72 mt-4">
        <div class="relative h-10 w-full min-w-[200px]">
          <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <input
            onBlur={basicForm.handleBlur}
            onChange={basicForm.handleChange}
            id="password"
            value={basicForm.values.password}
            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            type="password"
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            password
          </label>
        </div>
      </div>
      {basicForm.errors.password && basicForm.touched.password && (
        <div className="text-red-400">{basicForm.errors.password}</div>
      )}
      <p>
        {state ? (
          <div className=" flex font-bold text-[#40E0D0] text-lg space-x-2">
            <p>already have account </p>
            <p
              className="hover:text-gray-400 transition duration-300 cursor-pointer"
              onClick={changeAuth}
            >
              sign in
            </p>
          </div>
        ) : (
          <div className=" flex font-bold text-[#40E0D0] text-lg space-x-2">
            <p>don't have account</p>{" "}
            <p
              className="hover:text-gray-400 transition duration-300 cursor-pointer"
              onClick={changeAuth}
            >
              {" "}
              sign up
            </p>
          </div>
        )}
      </p>
      {!state ? (
        <button
          onClick={loginHandler}
          className="w-1/5 bg-black py-1 hover:bg-gray-700 transition duration-300 rounded-xl text-xl font-bold text-white"
        >
          Login
        </button>
      ) : (
        <button
          onClick={RegisterHandler}
          className="w-1/5 bg-black py-1 hover:bg-gray-700 transition duration-300 rounded-xl text-xl font-bold text-white"
        >
          Register
        </button>
      )}
    </div>
  );
};

export default Auth;
