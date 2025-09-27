import { useSearchParams } from "react-router";
import Button from "./Button";

function PriceFilter({ onFilterAply }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const priceFrom = searchParams.get("priceFrom") || null;
  const priceTo = searchParams.get("priceTo") || null;

  return (
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
          onFilterAply(data.priceFrom, data.priceTo);
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
        <Button className="self-end py-[10px] px-[42px]" type="submit">
          Apply
        </Button>
      </form>
    </div>
  );
}

export default PriceFilter;
