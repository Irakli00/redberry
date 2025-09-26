import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import { getProducts } from "../services/products";

import ItemCard from "../elements/products/ProductCard";
import Button from "../elements/components/Button";

import IconLeft from "../assets/icons/chevron-left.svg";
import IconRight from "../assets/icons/chevron-right.svg";
import IconDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter-icon.svg";
import Spinner from "../elements/components/Spinner";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [sort, setSort] = useState(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", page, sort, priceFrom, priceTo],
    queryFn: () => getProducts(page, priceFrom, priceTo, sort),
  });

  if (isLoading) return <Spinner></Spinner>;

  if (!isSuccess) return; //for now

  const {
    data: products,
    links: _,
    meta: { from, last_page: lastPage, total },
  } = data;

  return (
    <section className="mt-[72px]">
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-semibold text-[42px] text-main-black">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p>
            showing {from}-{from + 9 <= total ? from + 9 : total} of {total}{" "}
            results
          </p>
          <div className="w-[1px] h-[14px] bg-light-gray"></div>
          <div className="relative ">
            <button
              className="flex items-center gap-[8px] cursor-pointer "
              onClick={() => {
                setFilterOpen((p) => !p);
                setSortOpen(false);
              }}
            >
              <img src={FilterIcon} alt="filter" />
              <span>Filter</span>
            </button>
            {filterOpen && (
              <div className="flex flex-col bg-white rounded-[8px] border border-light-gray absolute right-0 top-[120%] max-w-[392px] p-[16px]">
                <h4 className="text-start font-semibold text-[16px] mb-[20px]">
                  Select price
                </h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    setPriceFrom(data.priceFrom);
                    setPriceTo(data.priceTo);
                    setFilterOpen(false);
                  }}
                  className="flex flex-col gap-[10px]"
                >
                  <div className="flex gap-[10px]">
                    <input
                      className="border w-full min-w-[175px] border-light-gray rounded-[8px] py-[10px] px-[12px]"
                      type="number"
                      name="priceFrom"
                      id="priceFrom"
                      placeholder="From"
                      required
                    />
                    <input
                      className="min-w-[175px] w-full border border-light-gray rounded-[8px] py-[10px] px-[12px]"
                      type="number"
                      name="priceTo"
                      id="priceTo"
                      placeholder="To"
                      required
                    />
                  </div>
                  <Button
                    className="self-end py-[10px] px-[42px]"
                    type="submit"
                  >
                    Apply
                  </Button>
                </form>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-[8px] cursor-pointer"
              onClick={() => {
                setSortOpen((p) => !p);
                setFilterOpen(false);
              }}
            >
              <span>Sort by</span>
              <img src={IconDown} alt="sort" />
            </button>

            {sortOpen && (
              <div className="flex flex-col bg-white rounded-[8px] border border-light-gray absolute right-0 top-[120%] w-[223px] overflow-hidden">
                <h4 className="text-start font-semibold text-[16px] p-[16px]">
                  Sort by
                </h4>

                <ul className="flex flex-col gap-[8px]">
                  <li
                    className="cursor-pointer px-[16px] py-[4px] hover:bg-main-red hover:text-white"
                    onClick={() => {
                      setSortOpen(false);
                      setSort("-created_at");
                    }}
                  >
                    New products first
                  </li>
                  <li
                    className="cursor-pointer px-[16px] py-[4px] hover:bg-main-red hover:text-white"
                    onClick={() => {
                      setSortOpen(false);

                      setSort("price");
                    }}
                  >
                    Price, low to high
                  </li>
                  <li
                    className="cursor-pointer px-[16px] py-[4px] hover:bg-main-red hover:text-white"
                    onClick={() => {
                      setSortOpen(false);

                      setSort("-price");
                    }}
                  >
                    Price, high to low
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
        {isSuccess &&
          products.map((el) => <ItemCard key={el.id} item={el}></ItemCard>)}
      </section>

      <aside className="flex justify-center mt-[90px] mb-[200px]">
        <ReactPaginate
          previousLabel={
            page > 1 && (
              <img
                className="cursor-pointer"
                src={IconLeft}
                alt="previous page"
                // onClick={setPage((p) => p--)}
                onClick={() => setSearchParams({ page: page + 1 })}
              ></img>
            )
          }
          nextLabel={
            page < lastPage && (
              <img
                className="cursor-pointer"
                src={IconRight}
                alt="next page"
                onClick={() => setSearchParams({ page: page - 1 })}
              ></img>
            )
          }
          breakLabel={
            <span className="flex items-center justify-center w-[32px] h-[32px] border border-light-gray text-dark-gray rounded-[4px]">
              ...
            </span>
          }
          forcePage={page - 1}
          breakLinkClassName="pointer-events-none cursor-default"
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          // onPageChange={(e) => setPage(e.selected + 1)}
          onPageChange={(e) => setSearchParams({ page: e.selected + 1 })}
          containerClassName="flex items-center gap-[8px]"
          pageClassName="border border-light-gray text-dark-gray/60 rounded-[4px]"
          pageLinkClassName="w-[32px] h-[32px] cursor-pointer flex items-center justify-center"
          activeClassName="border border-main-red text-main-red"
        />
      </aside>
    </section>
  );
}

export default Products;
