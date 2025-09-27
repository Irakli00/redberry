function ProductSizeSelect({
  selectedSize,
  availableSizes,
  defaultSize,
  onSizeChange,
}) {
  return (
    <div>
      <p className="mb-[16px]">Size: {selectedSize ?? defaultSize}</p>
      {availableSizes && (
        <ul className="flex gap-[8px]">
          {availableSizes.map((size) => (
            <li
              className="border border-light-gray rounded-[10px] py-[9px] px-[25px] cursor-pointer"
              style={{
                backgroundColor:
                  selectedSize === size && "rgba(248, 246, 247, 1)",
                border: selectedSize === size && "1px solid black",
              }}
              key={size}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSizeSelect;
