import React from "react";

const InputField = ({ id, label, type = "text", formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[id]}
      />
      {formik.touched[id] && formik.errors[id] ? (
        <div className="text-red-500">{formik.errors[id]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
