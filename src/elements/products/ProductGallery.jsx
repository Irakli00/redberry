function ProductGallery({
  imgAlt,
  images,
  coverImage,
  onImageClick,
  mainPhoto,
}) {
  return (
    <>
      <div className="flex gap-[9px] flex-col">
        {images.map((img, i) => (
          <img
            key={i}
            className="max-w-[121px] cursor-pointer rounded-[6px] border-1 border-light-gray"
            style={{
              borderColor: img === mainPhoto && "rgba(255, 64, 0, 1)",
            }}
            src={img}
            onClick={() => {
              onImageClick(img, i);
            }}
            alt={imgAlt}
          ></img>
        ))}
      </div>

      <div>
        <img
          className="max-w-[700px] border border-light-gray"
          src={mainPhoto ?? coverImage}
          alt={imgAlt}
        />
      </div>
    </>
  );
}

export default ProductGallery;
