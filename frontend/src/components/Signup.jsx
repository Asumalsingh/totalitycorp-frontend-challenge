import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  // Form validation using yup
  const signUpSchema = Yup.object({
    name: Yup.string().min(3).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password doesn't match"),
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Form data handeling using formic
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        const { name, email, password } = values;
        axios
          .post(`${BASE_URL}/auth/signUp`, { name, email, password })
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
        <h1 className="font-bold text-2xl">SIGN UP</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full my-2 p-3 rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none"
        />
        {errors.name && touched.name ? (
          <p className="text-red-500 text-xs">{errors.name}</p>
        ) : null}
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
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full my-2 p-3  rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none "
        />
        {errors.confirmPassword && touched.confirmPassword ? (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        ) : null}

        <input
          type="submit"
          value="Sign up"
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg w-full px-4 py-3 my-4"
        />
      </form>
    </div>
  );
}
