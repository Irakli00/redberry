function ProductDescription({ imgUrl, name, description }) {
  return (
    <aside>
      <div className="flex items-center justify-between max-h-[60px]">
        <h3 className="text-[20px] font-medium">Details</h3>
        <img className="max-w-[80px]" src={imgUrl} alt={name} />
      </div>
      <p className="mb-[20px]">Brand: {name}</p>

      <p>{description}</p>
    </aside>
  );
}

export default ProductDescription;
