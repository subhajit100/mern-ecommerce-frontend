import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCartItemsStatus,
  selectCartLoaded,
  selectCount,
  selectItems,
  updateCartAsync,
} from "./cartSlice";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";
import { centerStyle } from "../../constants";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const status = useSelector(selectCartItemsStatus);
  const cartLoaded = useSelector(selectCartLoaded);
  const [modalId, setModalId] = useState(-1);
  const totalAmount = items.reduce(
    (total, item) => total + item.product.discountPrice * item.quantity,
    0
  );
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleItemDelete = (itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
    setModalId(-1);
  };

  const handleRemoveClick = (itemId) => {
    setModalId(itemId);
  };

  const handleCancelAction = () => {
    setModalId(-1);
  };

  return (
    <>
      {items.length === 0 && cartLoaded && <Navigate to="/" replace={true} />}
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
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="mt-10 my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Cart
              </h2>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">
                              ${item.product.discountPrice}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>

                          <div className="flex">
                            <Modal
                              title={`Delete ${item.product.title} from Cart`}
                              message="Are you sure you want to delete this item from cart?"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              dangerAction={() => handleItemDelete(item.id)}
                              showModal={modalId === item.id}
                              cancelAction={handleCancelAction}
                            />
                            <button
                              onClick={(e) => {
                                handleRemoveClick(item.id);
                              }}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
