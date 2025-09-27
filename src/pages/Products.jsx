import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

import { getProducts } from "../services/products";

import ItemCard from "../elements/products/ProductCard";
import Spinner from "../elements/components/Spinner";
import FilterTab from "../elements/components/FilterTab";

import PriceFilter from "../elements/components/PriceFilter";

import IconDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter-icon.svg";
import SortFilter from "../elements/components/Sortfilter";
import Pagination from "../elements/components/Pagination";
import NoProductsFound from "../elements/components/NoProductsFound";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [sort, setSort] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const activeFilters = [];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("priceFrom");
    params.delete("priceTo");
    params.delete("sort");
    setSearchParams(params);
  }, []); //for reload reset

  if (priceFrom || priceTo) {
    activeFilters.push({
      label: `Price: ${priceFrom || 0} - ${priceTo || "∞"}`,
      onRemove: () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("priceFrom");
        newParams.delete("priceTo");
        setSearchParams(newParams);

        setPriceFrom(null);
        setPriceTo(null);
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

        setSort(null);
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
              <PriceFilter
                onFilterAply={(priceFrom, priceTo) => {
                  setFilterOpen(false);
                  setPriceFrom(priceFrom);
                  setPriceTo(priceTo);
                }}
              ></PriceFilter>
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
              <SortFilter
                onFilterApply={(sort) => {
                  setSortOpen(false);
                  setSort(sort);
                }}
              ></SortFilter>
            )}
          </div>
        </div>
      </div>

      {!!activeFilters.length && (
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
        {!products.length && <NoProductsFound></NoProductsFound>}
        {isSuccess &&
          products.map((el) => <ItemCard key={el.id} item={el}></ItemCard>)}
      </section>

      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage}></Pagination>
      )}
    </section>
  );
}

export default Products;
