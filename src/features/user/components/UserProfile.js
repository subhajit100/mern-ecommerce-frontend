import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  selectUserOrdersStatus,
  updateUserAsync,
} from "../userSlice";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import Modal from "../../common/Modal";
import { centerStyle } from "../../../constants";
import { Grid } from "react-loader-spinner";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectUserOrdersStatus);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [modalId, setModalId] = useState(-1);
  const alert = useAlert();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync({ update: newUser, alert, message: "edited" }));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync({ update: newUser, alert, message: "deleted" }));
    setModalId(-1);
  };

  const handleEditForm = (e, index) => {
    setSelectedEditIndex(index);
    setShowAddAddressForm(false);
    // resetting if add new form was open or some other edit form was open previously
    reset();
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    }; // for shallow copy issue
    dispatch(updateUserAsync({ update: newUser, alert, message: "added" }));
    setShowAddAddressForm(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditFormClose = (e) => {
    reset();
    setSelectedEditIndex(-1);
  };

  const handleAddFormClose = (e) => {
    reset();
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {/* <h2 className="mt-10 my-5 text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Name : {userInfo.name ? userInfo.name : "New User"}
          </h2> */}
          <h3 className="mt-10 my-5 text-xl font-bold leading-9 tracking-tight text-red-900">
            Email Address: {userInfo.email}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="mt-10 my-5 text-xl font-bold leading-9 tracking-tight text-red-900">
              Role: {userInfo.role}
            </h3>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
              reset();
            }}
            className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add New Address
          </button>

          {showAddAddressForm ? (
            <form
              className="bg-white px-2 py-12 my-8"
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
              noValidate
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
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
                      </div>
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          id="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.street && (
                        <p className="text-red-500">{errors.street.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    onClick={(e) => handleAddFormClose(e)}
                    className="rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <h3 className="mt-0.5 text-lg text-gray-500">Your Addresses:</h3>
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
            userInfo &&
            userInfo.addresses.map((address, index) => (
              <div key={index}>
                {selectedEditIndex === index ? (
                  <form
                    className="bg-white px-2 py-12 my-8"
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                    noValidate
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-4">
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
                            </div>
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                {...register("phone", {
                                  required: "phone is required",
                                })}
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                id="state"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pinCode", {
                                  required: "pinCode is required",
                                })}
                                id="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="submit"
                          onClick={(e) => handleEditFormClose(e)}
                          className="rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}

                <div className="flex xs:flex-col justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4 xs:text-center xs:my-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:flex-col xs:flex xs:flex-col sm:items-end xs:text-center xs:my-4">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col xs:flex xs:flex-col sm:items-end xs:my-4">
                    <Modal
                      title={`Delete ${address.name} from Address List`}
                      message="Are you sure you want to delete this address from your address list?"
                      dangerOption="Delete"
                      cancelOption="Cancel"
                      dangerAction={() => handleRemove(index)}
                      showModal={modalId === index}
                      cancelAction={() => {
                        setModalId(-1);
                      }}
                    />
                    <button
                      onClick={(e) => handleEditForm(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setModalId(index);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
