import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getProduct } from "../services/products";

function ProductDetails() {
  const { id: productId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  if (isLoading) return <h1>ITS A SPINNER</h1>;
  return (
    <main className="m-auto max-w-[1720px] mt-[30px]">
      <aside className="flex">
        <Link to={"/products"}>Listing</Link>
        <p>/</p>
        <Link to={"#"}>Product</Link>
      </aside>

      <section className="flex gap-11">
        <div className="flex">
          <div>
            {data.images.map((img) => (
              <img className="max-w-[121px]" src={img} alt={data.name}></img>
            ))}
          </div>

          <div>
            <img
              className="max-w-[700px]"
              src={data.cover_image}
              alt={data.name}
            />
          </div>
        </div>

        <article className="flex flex-col gap-[56px]">
          <div className="flex flex-col gap-[21px]">
            <h1 className="text-main-black text-[32px] font-semibold">
              {data.name}
            </h1>
            <p className="text-main-black text-[32px] font-semibold">
              ${data.price}
            </p>
          </div>

          <div>
            <p>Color: {data.color}</p>
            <ul>
              {data.available_colors.map((color) => (
                <li style={{ backgroundColor: color }}>{color}</li>
              ))}
            </ul>
          </div>

          <div>
            <p>Size: {data.size}</p>
            <ul>
              {data.available_sizes.map((size) => (
                <li>{size}</li>
              ))}
            </ul>
          </div>

          <div>
            {!data.quantity && <p>SOLD OUT</p>}{" "}
            {/* gottta ask about this one */}
            {data.quantity && (
              <select name="quantity" id="quantity">
                {Array.from({
                  length: data.quantity <= 10 ? data.quantity : 10,
                }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button className="bg-main-red">
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 3.5H3.63568C4.14537 3.5 4.59138 3.84265 4.7227 4.33513L5.1059 5.77209M7.5 14.75C5.84315 14.75 4.5 16.0931 4.5 17.75H20.25M7.5 14.75H18.7183C19.8394 12.4494 20.8177 10.0664 21.6417 7.6125C16.88 6.39646 11.8905 5.75 6.75 5.75C6.20021 5.75 5.65214 5.7574 5.1059 5.77209M7.5 14.75L5.1059 5.77209M6 20.75C6 21.1642 5.66421 21.5 5.25 21.5C4.83579 21.5 4.5 21.1642 4.5 20.75C4.5 20.3358 4.83579 20 5.25 20C5.66421 20 6 20.3358 6 20.75ZM18.75 20.75C18.75 21.1642 18.4142 21.5 18 21.5C17.5858 21.5 17.25 21.1642 17.25 20.75C17.25 20.3358 17.5858 20 18 20C18.4142 20 18.75 20.3358 18.75 20.75Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Add to cart</span>
          </button>

          <div>
            <p>im just a line</p>
          </div>

          <aside>
            <h3>Details</h3>
            <img src={data.brand.image} alt={data.brand.name} />
            <p>Brand:{data.brand.name}</p>

            <p>{data.description}</p>
          </aside>
        </article>
      </section>
    </main>
  );
}

export default ProductDetails;
