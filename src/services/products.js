async function getProducts(page, priceFrom, priceTo, sort) {
  const params = new URLSearchParams();
  params.append("page", page);

  if (priceFrom) params.append("filter[price_from]", priceFrom);
  if (priceTo) params.append("filter[price_to]", priceTo);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/products?${params.toString()}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getProduct(id) {
  const res = await fetch(
    `https://api.redseam.redberryinternship.ge/api/products/${id}`,
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

export { getProducts, getProduct };
