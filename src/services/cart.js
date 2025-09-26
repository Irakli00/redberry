async function getCart() {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/cart",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
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
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
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

async function updateCartItem({ item, quantity }) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${item.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
      },
      body: JSON.stringify({
        quantity,
        color: item.color,
        size: item.size,
      }),
    }
  );

  if (!res.ok) throw new Error("couldn't add to a cart");

  return res.json();
}

async function removeFromCart({ id: itemId, quantity, color, size }) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
      },
      body: JSON.stringify({
        quantity,
        color,
        size,
      }),
    }
  );

  if (!res.ok) throw new Error("couldn't remove from a cart");

  return res.json();
}

async function checkout({ firstname, surname, email, address, zipCode }) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
      },
      body: JSON.stringify({
        name: firstname,
        surname,
        email,
        address,
        zip_code: zipCode,
      }),
    }
  );

  if (!res.ok) throw new Error("couldn't checkout");

  return res.json();
}

export { getCart, addToCart, updateCartItem, removeFromCart, checkout };
