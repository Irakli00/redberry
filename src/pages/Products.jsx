import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";

import IconLeft from "../assets/icons/chevron-left.svg";
import IconRight from "../assets/icons/chevron-right.svg";
import IconDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter-icon.svg";

import { getProducts } from "../services/products";
import ItemCard from "../elements/products/ProductCard";
import { AppContext } from "../context/AppContext";

function Products() {
  const { page, setPage } = useContext(AppContext); //may make link latter
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", page],
    // queryFn: () => getProducts(page, 250, 500),
    queryFn: () => getProducts(page, priceFrom, priceTo),
  });

  let from = 1,
    lastPage = 100,
    total;

  if (isSuccess) {
    ({ from, last_page: lastPage, total } = data.meta);
  }

  if (isLoading) return <h1>Loading...</h1>; //spinner latter

  return (
    <main className="m-auto max-w-[1720px] mt-[72px]">
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-semibold text-[42px] text-main-black">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p className="">
            showing {from}-{from + 9 <= total ? from + 9 : total} of {total}{" "}
            results
          </p>
          <div className="w-[1px] h-[14px] bg-light-gray"></div>
          <div className="relative">
            <button
              className="flex items-center gap-[8px] cursor-pointer "
              onClick={() => setFilterOpen((p) => !p)}
            >
              <img src={FilterIcon} alt="filter" />
              <span>Filter</span>
            </button>
            {filterOpen && (
              <div className="flex flex-col bg-white rounded-[8px] border border-light-gray absolute right-0 top-[120%] max-w-[392px] p-[16px]">
                <h4 className="text-start font-semibold text-[16px] mb-[20px]">
                  Select price
                </h4>
                <div className="flex gap-[10px]">
                  <input
                    className="border w-full min-w-[175px] border-light-gray rounded-[8px] py-[10px] px-[12px]"
                    type="text"
                    name="priceFrom"
                    id="priceFrom"
                    placeholder="From"
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                  <input
                    className="min-w-[175px] w-full border border-light-gray rounded-[8px] py-[10px] px-[12px]"
                    type="text"
                    name="priceTo"
                    id="priceTo"
                    placeholder="To"
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setFilterOpen(false);
                  }}
                  className="cursor-pointer bg-main-red mt-[10px] self-end py-[10px] px-[42px] text-white rounded-[10px]"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
          <button className="flex items-center gap-[8px] cursor-pointer">
            <span>Sort by</span>
            <img src={IconDown} alt="sort" />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-4 gap-x-[24px] gap-y-[48px]">
        {isSuccess &&
          data.data.map((el) => <ItemCard key={el.id} item={el}></ItemCard>)}
      </section>

      <aside className="flex justify-center mt-[90px] mb-[200px]">
        <ReactPaginate
          previousLabel={
            page > 1 && (
              <img
                className="cursor-pointer"
                src={IconLeft}
                alt="previous page"
                onClick={setPage((p) => p--)}
              ></img>
            )
          }
          nextLabel={
            page < lastPage && (
              <img
                className="cursor-pointer"
                src={IconRight}
                alt="next page"
                onClick={setPage((p) => p++)}
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
          onPageChange={(e) => setPage(e.selected + 1)}
          containerClassName="flex items-center gap-[8px]"
          pageClassName="border border-light-gray text-dark-gray/60 rounded-[4px]"
          pageLinkClassName="w-[32px] h-[32px] cursor-pointer flex items-center justify-center"
          activeClassName="border border-main-red text-main-red"
        />
      </aside>
    </main>
  );
}

export default Products;
