import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, centerStyle } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectAdminOrderStatus,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const status = useSelector(selectAdminOrderStatus);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, sort, page]);

  // used to edit both the order status and payment status
  const [editableOrderId, setEditableOrderId] = useState(-1);

  // set which order to edit after clicking the pencilicon
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatusUpdate = (e, order) => {
    const newOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(newOrder));
    setEditableOrderId(-1);
  };

  const handlePaymentStatusUpdate = (e, order) => {
    const newOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(newOrder));
    setEditableOrderId(-1);
  };

  // when edit mode is off, based on status, different colours are shown
  const chooseColour = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-blue-200 text-blue-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const newSort = {
      ...sort,
      _sort: sortOption.sort,
      _order: sortOption.order,
    };
    setSort(newSort);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order:
                          sort._order && sort._order === "desc"
                            ? "asc"
                            : "desc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ))}
                  </th>
                  <th className="py-3 px-0 text-left">Items</th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order:
                          sort._order && sort._order === "desc"
                            ? "asc"
                            : "desc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order:
                          sort._order && sort._order === "desc"
                            ? "asc"
                            : "desc",
                      })
                    }
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order:
                          sort._order && sort._order === "desc"
                            ? "asc"
                            : "desc",
                      })
                    }
                  >
                    Last Updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowDownIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
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
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-left">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="mr-2 mt-1">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - $
                              {item.product.discountPrice}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="items-center justify-center">
                          <div>
                            {" "}
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>

                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.state},</div>
                          <div>{order.selectedAddress.pinCode},</div>
                          <div>{order.selectedAddress.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {editableOrderId === order.id ? (
                          <select
                            onChange={(e) => handleOrderStatusUpdate(e, order)}
                            value={order.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColour(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {editableOrderId === order.id ? (
                          <select
                            onChange={(e) =>
                              handlePaymentStatusUpdate(e, order)
                            }
                            value={order.paymentStatus}
                          >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColour(
                              order.paymentStatus
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-6 cursor-pointer"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
};

export default AdminOrders;
