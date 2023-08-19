// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    
    resolve({ data });
  });
}

export function fetchAllOrders({ sort, pagination }) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    
    const response = await fetch(`/orders?${queryString}`);
    const totalOrders = await response.headers.get("X-Total-Count");
    const data = await response.json();
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
