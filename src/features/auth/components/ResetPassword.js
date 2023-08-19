import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

import ecommerce_logo from "../../../ecommerce_logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
  selectError,
  selectLoggedInStatus,
  selectPasswordReset,
} from "../authSlice";
import { centerStyle } from "../../../constants";
import { Grid } from "react-loader-spinner";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const status = useSelector(selectLoggedInStatus);
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

  return (
    <>
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
        token &&
        email && (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src={ecommerce_logo}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter New Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6 xs:w-full xs:max-w-sm xs:mx-auto"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                })}
                noValidate
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="relative mt-2">
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
                      Confirm New Password
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
                  {passwordReset && (
                    <p className="text-green-500">
                      Password Reset Successfully
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Send me back to{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}
