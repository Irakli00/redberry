import { useSearchParams } from "react-router";

import SortOption from "./SortOption";

function SortFilter({ onFilterApply }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col bg-white rounded-[8px] border border-light-gray absolute right-0 top-[120%] w-[223px] overflow-hidden">
      <h4 className="text-start font-semibold text-[16px] p-[16px]">Sort by</h4>

      <ul className="flex flex-col ">
        <SortOption
          onClick={() => {
            onFilterApply("-created_at");
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sort", "-created_at");
            setSearchParams(newParams);
          }}
        >
          New products first
        </SortOption>
        <SortOption
          onClick={() => {
            onFilterApply("price");
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sort", "price");
            setSearchParams(newParams);
          }}
        >
          Price, low to high
        </SortOption>
        <SortOption
          onClick={() => {
            onFilterApply("-price");
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sort", "-price");
            setSearchParams(newParams);
          }}
        >
          Price,high to low
        </SortOption>
      </ul>
    </div>
  );
}

export default SortFilter;
