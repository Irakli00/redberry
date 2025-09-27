import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppContext } from "../context/AppContext";

import { getProduct } from "../services/products";
import { addToCart } from "../services/cart";

import SoldOutBanner from "../elements/components/SoldOutBanner";
import Button from "../elements/components/Button";
import Spinner from "../elements/components/Spinner";
import ProductGallery from "../elements/products/ProductGallery";
import ProductColorSelect from "../elements/products/ProductColorSelect";
import ProductQuantitySelect from "../elements/products/ProductQuantitySelect";

import SuccessIcon from "../assets/icons/success.svg";
import ProductDescription from "../elements/products/ProductDescription";
import ProductSizeSelect from "../elements/products/ProductSizeSelect";

function ProductDetails() {
  const { user, isAuthorised } = useContext(AppContext);
  const { id: productId } = useParams();

  const qClient = useQueryClient();

  const { data, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainPhoto, setMainPhoto] = useState(null);

  const [showMessage, setShowMessage] = useState(false);

  const {
    mutate: addToCartMutation,
    // isPending: isBeingAdded,
    // isSuccess: isAddedSuccesfuly,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1200);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    addToCartMutation({
      product: productId,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  }

  useEffect(() => {
    if (data) {
      setSelectedColor(
        !data.color || data.color === "Default"
          ? data.available_colors[0]
          : data.color
      );
      setSelectedSize(data.size);
      setMainPhoto(data.cover_image);
    }
  }, [data]);

  if (productLoading) return <Spinner></Spinner>;

  return (
    <section className="mt-[30px]">
      <aside className="flex text-[14px] font-light">
        <Link to={"/products"}>Listing</Link>
        <p>/</p>
        <Link to={"#"}>Product</Link>
      </aside>

      <section className="flex gap-11 mt-[50px] ">
        <div className="flex gap-[24px]">
          <ProductGallery
            imgAlt={data.name}
            mainPhoto={mainPhoto}
            coverImage={data.cover_image}
            images={data.images}
            onImageClick={(img, i) => {
              setMainPhoto(img);
              setSelectedColor(data.available_colors[i]);
            }}
          ></ProductGallery>
        </div>

        <article className="flex flex-col gap-[56px] overflow-hidden w-full">
          <div className="flex flex-col gap-[21px]">
            <h1 className="text-main-black text-[32px] font-semibold">
              {data.name}
            </h1>
            <p className="text-main-black text-[32px] font-semibold">
              ${data.price}
            </p>
          </div>

          {!data.quantity ? (
            <SoldOutBanner></SoldOutBanner>
          ) : (
            <form className="flex flex-col gap-[48px]" onSubmit={handleSubmit}>
              {data.available_colors && (
                <ProductColorSelect
                  colors={data.available_colors}
                  selectedColor={selectedColor}
                  onColorSelect={(c, i) => {
                    setSelectedColor(c);
                    setMainPhoto(data.images[i]);
                  }}
                ></ProductColorSelect>
              )}

              {(selectedSize || data.size) && (
                <ProductSizeSelect
                  selectedSize={selectedSize}
                  availableSizes={data.available_sizes}
                  defaultSize={data.size}
                  onSizeChange={setSelectedSize}
                />
              )}

              {data.quantity && (
                <ProductQuantitySelect
                  quantity={data.quantity}
                  onQuantitySelect={(q) => setQuantity(q)}
                ></ProductQuantitySelect>
              )}

              <Button
                disableCondition={!isAuthorised || !data.quantity}
                type="submit"
              >
                <>
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

                  <span className="text-white relative flex items-center gap-2">
                    {!isAuthorised
                      ? "You need to log in for purchases"
                      : "Add to cart"}
                  </span>
                  {showMessage && (
                    <div className="absolute bg-main-red flex items-center gap-[5px]">
                      <p>Added successfully</p>
                      <img
                        src={SuccessIcon}
                        alt="Success"
                        className={`h-[20px] `}
                      />
                    </div>
                  )}
                </>
              </Button>
            </form>
          )}

          <div className="h-[1px] bg-light-gray"></div>

          {(data.brand || data.description) && (
            <ProductDescription
              name={data.brand.name}
              imgUrl={data.brand.image}
              description={data.description}
            ></ProductDescription>
          )}
        </article>
      </section>
    </section>
  );
}

export default ProductDetails;
