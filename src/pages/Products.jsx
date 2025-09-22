import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import IconLeft from "../assets/icons/chevron-left.svg";
import IconRight from "../assets/icons/chevron-right.svg";
import IconDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter-icon.svg";

import { getProducts } from "../services/products";
import ItemCard from "../elements/products/ProductCard";

function Products() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
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
            showing {from}-{lastPage} of {total} results
          </p>
          <div className="w-[1px] h-[14px] bg-light-gray"></div>
          <button className="flex items-center gap-[8px] cursor-pointer">
            <img src={FilterIcon} alt="filter" />
            <span>Filter</span>
          </button>
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
            <img
              className="cursor-pointer"
              src={IconLeft}
              alt="previous page"
            ></img>
          }
          nextLabel={
            <img
              className="cursor-pointer"
              src={IconRight}
              alt="next page"
            ></img>
          }
          breakLabel={
            <span className="flex items-center justify-center w-[32px] h-[32px] border border-light-gray text-dark-gray rounded-[4px]">
              ...
            </span>
          }
          breakLinkClassName="pointer-events-none cursor-default"
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          // onPageChange={(e) => onPageChange(e.selected + 1)}
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
