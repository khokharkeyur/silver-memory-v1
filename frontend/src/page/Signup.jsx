import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../component/comman/InputField";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../component/api";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const response = await api.post("/user/signup", payload);
        console.log("response.status", response.status);
        if (response?.status === 200) {
          navigate("/login");
          toast.success("user signup succefully");
        }
        console.log("response", response);
      } catch (error) {
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
        className="h-auto w-full max-w-md bg-white p-8 rounded shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Register
        </h2>

        <InputField id="name" label="Name" formik={formik} />

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
          Already have an account? <Link to="/login"> login </Link>
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

export default Signup;
