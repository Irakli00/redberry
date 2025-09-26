import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import { getProducts } from "../services/products";

import ItemCard from "../elements/products/ProductCard";
import Button from "../elements/components/Button";
import Spinner from "../elements/components/Spinner";
import FilterTab from "../elements/components/FilterTab";

import IconLeft from "../assets/icons/chevron-left.svg";
import IconRight from "../assets/icons/chevron-right.svg";
import IconDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter-icon.svg";
import SortOption from "../elements/components/SortOption";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const priceFrom = searchParams.get("priceFrom") || null;
  const priceTo = searchParams.get("priceTo") || null;
  const sort = searchParams.get("sort") || null;

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const activeFilters = [];

  if (priceFrom || priceTo) {
    activeFilters.push({
      label: `Price: ${priceFrom || 0} - ${priceTo || "∞"}`,
      onRemove: () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("priceFrom");
        newParams.delete("priceTo");
        setSearchParams(newParams);
      },
    });
  }

  if (sort) {
    let label = "";
    if (sort === "-created_at") label = "Newest";
    if (sort === "price") label = "Price: Low to high";
    if (sort === "-price") label = "Price: High to low";

    activeFilters.push({
      label,
      onRemove: () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("sort");
        setSearchParams(newParams);
      },
    });
  }

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", page, sort, priceFrom, priceTo],
    queryFn: () => getProducts(page, priceFrom, priceTo, sort),
  });

  if (isLoading) return <Spinner></Spinner>;

  const {
    data: products,
    links: _,
    meta: { from, last_page: lastPage, total },
  } = data;

  return (
    <section className="mt-[72px]">
      <div className="flex justify-between mb-[20px]">
        <h1 className="font-semibold text-[42px] text-main-black">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p>
            showing {from || 0}-{from + 9 <= total ? from + 9 : total} of{" "}
            {total} results
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

                    const newParams = new URLSearchParams(searchParams);
                    if (data.priceFrom) {
                      newParams.set("priceFrom", data.priceFrom);
                    }
                    if (data.priceTo) {
                      newParams.set("priceTo", data.priceTo);
                    }

                    setSearchParams(newParams);
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
                      defaultValue={priceFrom || ""}
                      required
                    />
                    <input
                      className="min-w-[175px] w-full border border-light-gray rounded-[8px] py-[10px] px-[12px]"
                      type="number"
                      name="priceTo"
                      id="priceTo"
                      placeholder="To"
                      defaultValue={priceTo || ""}
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

                <ul className="flex flex-col ">
                  <SortOption
                    onClick={() => {
                      setSortOpen(false);
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("sort", "-created_at");
                      setSearchParams(newParams);
                    }}
                  >
                    New products first
                  </SortOption>
                  <SortOption
                    onClick={() => {
                      setSortOpen(false);
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("sort", "price");
                      setSearchParams(newParams);
                    }}
                  >
                    Price, low to high
                  </SortOption>
                  <SortOption
                    onClick={() => {
                      setSortOpen(false);
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("sort", "-price");
                      setSearchParams(newParams);
                    }}
                  >
                    Price,high to low
                  </SortOption>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {(sort || priceFrom || priceTo) && (
        <div className="flex gap-[20px] mt-[20px] mb-[26px]">
          {activeFilters.map((f, i) => (
            <FilterTab
              label={f.label}
              key={i}
              onRemove={f.onRemove}
            ></FilterTab>
          ))}
        </div>
      )}

      <section className="grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
        {!products.length && (
          <article className="text-main-red  text-center col-span-4">
            <h1 className="text-[62px] font-bold">No items found</h1>
            <p className="text-[22px] ">Try other filters</p>
          </article>
        )}
        {isSuccess &&
          products.map((el) => <ItemCard key={el.id} item={el}></ItemCard>)}
      </section>

      {lastPage > 1 && (
        <aside className="flex justify-center mt-[90px] mb-[200px]">
          <ReactPaginate
            previousLabel={
              page > 1 && (
                <img
                  className="cursor-pointer"
                  src={IconLeft}
                  alt="previous page"
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
            onPageChange={(e) => setSearchParams({ page: e.selected + 1 })}
            containerClassName="flex items-center gap-[8px]"
            pageClassName="border border-light-gray text-dark-gray/60 rounded-[4px]"
            pageLinkClassName="w-[32px] h-[32px] cursor-pointer flex items-center justify-center"
            activeClassName="border border-main-red text-main-red"
          />
        </aside>
      )}
    </section>
  );
}

export default Products;
