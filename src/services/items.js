// async function getProducts(page, sort, priceFrom, priceTo) {
async function getProducts() {
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/products",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("couldn't get items");

  return res.json();
}

export default getProducts;
