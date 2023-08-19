// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    
    resolve({ data });
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    
    const response = await fetch(`/cart`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart/${update.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    const data = await response.json();
    
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    // fetch all items with the "userId"
    const response = await fetchItemsByUserId();
    const items = response.data;

    // loop over items from previous step to delete them one by one
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status: "success"});
  });
}
