function SortOption({ onClick, children }) {
  return (
    <li
      className="cursor-pointer px-[16px] py-[12px] hover:bg-main-red hover:text-white"
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default SortOption;
