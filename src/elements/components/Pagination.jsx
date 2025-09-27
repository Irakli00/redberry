import { useSearchParams } from "react-router";
import ReactPaginate from "react-paginate";

import IconLeft from "../../assets/icons/chevron-left.svg";
import IconRight from "../../assets/icons/chevron-right.svg";

function Pagination({ lastPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  return (
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
  );
}

export default Pagination;
