async function getCart(token) {
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

export { getCart };
