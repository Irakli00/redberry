function ProductQuantitySelect({ quantity, onQuantitySelect }) {
  return (
    <div>
      <p className="mb-[16px]">Quantity:</p>
      <select
        className="border border-light-gray rounded-[10px] py-[9px] px-[16px]"
        name="quantity"
        id="quantity"
        onChange={(e) => onQuantitySelect(+e.target.value)}
      >
        {Array.from({
          length: quantity <= 10 ? quantity : 10,
        }).map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductQuantitySelect;
