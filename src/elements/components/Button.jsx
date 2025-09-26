function Button({
  children,
  type = "button",
  className = "",
  onClick = null,
  disableCondition = null,
}) {
  return (
    <button
      type={type}
      disabled={disableCondition}
      className={`orange-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
