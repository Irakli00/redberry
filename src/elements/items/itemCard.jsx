import { Link } from "react-router";

function ItemCard({ item }) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="flex flex-col cursor-pointer max-h-[612px] max-w-[412px]"
    >
      <img
        className="mb-[12px] rounded-[10px]"
        src={item.cover_image}
        alt={item.name}
      />
      <p className="text-[18px] font-medium">{item.name}</p>
      <p className="text-[18px] font-medium">${item.price}</p>
    </Link>
  );
}

export default ItemCard;
