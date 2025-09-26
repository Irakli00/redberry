import CloseIcon from "../../assets/icons/close.svg";

function FilterTab({ label, onRemove }) {
  return (
    <div className="flex items-center gap-[6px] border border-light-gray rounded-[50px] py-[8px] px-[16px]">
      <p>{label}</p>
      <img
        className="w-[12px] h-[12px] cursor-pointer"
        src={CloseIcon}
        alt="remove filter"
        onClick={onRemove}
      />
    </div>
  );
}

export default FilterTab;
