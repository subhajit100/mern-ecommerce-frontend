import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

import {
  createUserAsync,
  selectError,
  selectLoggedInStatus,
  selectLoggedInUser,
  setDefaultErrorMessage,
} from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ecommerce_logo from "../../../ecommerce_logo.png";
import { useAlert } from "react-alert";
import { centerStyle } from "../../../constants";
import { Grid } from "react-loader-spinner";

export default function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);
  const alert = useAlert();
  const status = useSelector(selectLoggedInStatus);
  const error = useSelector(selectError);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmPasswordVisibility(e) {
    e.preventDefault();
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    dispatch(setDefaultErrorMessage());
  }, [dispatch]);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      {status === "loading" ? (
        <div style={centerStyle}>
          <Grid
            height="80"
            width="80"
            color="rgb(79 70 229)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={ecommerce_logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a New Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 xs:w-full xs:max-w-sm xs:mx-auto"
              onSubmit={handleSubmit((data) =>
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                    alert,
                  })
                )
              )}
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Invalid Email",
                      },
                    })}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative ">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                - Can contain special characters`,
                      },
                    })}
                    type={isPasswordVisible ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="w-6 h-6 inline" />
                    ) : (
                      <EyeIcon className="w-6 h-6 inline" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm-password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Password not matching",
                    })}
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashIcon className="w-6 h-6 inline" />
                    ) : (
                      <EyeIcon className="w-6 h-6 inline" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {error && <p className="text-red-500">{error.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
