import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ProductColorSelect({ colors, onColorSelect, selectedColor }) {
  const { colorMap } = useContext(AppContext);

  return (
    <div>
      <p className="mb-[16px]">Color: {selectedColor}</p>

      <ul className="flex items-center gap-[23px] pl-[6px] ">
        {colors.map((color, i) => (
          <li
            key={color}
            style={{
              background: colorMap[color],
              outline: selectedColor === color && "1px solid lightgray",
              outlineOffset: selectedColor === color && "5px",
              outlineColor: selectedColor === color && "lightgray",
            }}
            className="h-[38px] w-[38px] rounded-full  border border-light-gray cursor-pointer"
            onClick={() => {
              // setMainPhoto(data.images[i]);
              // setSelectedColor(color);
              onColorSelect(color, i);
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default ProductColorSelect;
