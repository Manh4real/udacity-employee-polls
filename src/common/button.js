export const buttonClasses = {
  primary:
    "bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none",
  disabled: "bg-blue-400 cursor-not-allowed",
  greenOutlined:
    "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
};

export function getButtonClasses({ disabled = false }) {
  return (
    (disabled ? buttonClasses.disabled : buttonClasses.primary) +
    " text-white w-28 text-base font-medium rounded-lg px-5 py-2.5 text-center text-sm"
  );
}
