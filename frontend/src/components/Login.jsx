import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Login() {
  // Form validation using yup
  const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Form data handeling using formic
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        axios
          .post(`${BASE_URL}/auth/login`, values)
          .then((response) => {
            localStorage.setItem("auth-token", response.data.authToken);
            location.reload();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      },
    });
  return (
    <div>
      <div className="flex justify-center mb-5">
        <h1 className="font-bold text-2xl">LOGIN</h1>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full my-2 p-3  rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none "
        />
        {errors.email && touched.email ? (
          <p className="text-red-500 text-xs">{errors.email}</p>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full my-2 p-3 rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none "
        />
        {errors.password && touched.password ? (
          <p className="text-red-500 text-xs">{errors.password}</p>
        ) : null}

        <input
          type="submit"
          value="Login"
          className="bg-blue-500 cursor-pointer text-white rounded-lg w-full px-4 py-3 my-4"
        />
      </form>
    </div>
  );
}
