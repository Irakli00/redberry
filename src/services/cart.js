async function getCart() {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/cart",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.slice(1, -1)}`,
      },
    }
  );

  if (!res.ok) throw new Error("couldn't get a cart");

  return res.json();
}

async function addToCart(item) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${item.product}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.slice(1, -1)}`,
      },
      body: JSON.stringify({
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }),
    }
  );

  if (!res.ok) throw new Error("couldn't add to a cart");

  return res.json();
}

async function removeFromCart(itemId) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.slice(1, -1)}`,
      },
    }
  );

  if (!res.ok) throw new Error("couldn't remove from a cart");

  return res.json();
}

export { getCart, addToCart, removeFromCart };
