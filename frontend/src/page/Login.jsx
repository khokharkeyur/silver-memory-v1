import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../component/comman/InputField";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../component/api";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        console.log("payload", payload);
        const response = await api.post("/user/login", payload);
        console.log("response.status", response.data);
        console.log("response", response);
        if (response?.status === 200) {
          const { token, userId } = response.data;
          Cookies.set("token", token, { expires: 1 });
          Cookies.set("userId", userId, { expires: 1 });
          toast.success("user Login succefully");
          navigate("/");
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <InputField
          id="email"
          label="Email Address"
          type="email"
          formik={formik}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          formik={formik}
        />

        <p className="text-right my-2 cursor-pointer text-blue-600">
          Don't have an account? <Link to="/signup"> signup </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submit..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
