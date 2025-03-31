import { useState } from "react";
import { X } from "lucide-react";
import { RiSearch2Line, RiSearchLine } from "react-icons/ri";

/**
 * Input component with search functionality and state-based styling
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler for the input
 * @param {function} props.onClear - Function to call when clear button is clicked
 * @param {Object} props.containerClassName - Additional classes for the container
 * @param {Object} props.inputClassName - Additional classes for the input
 * @param {React.ReactNode} props.icon - Custom icon to display
 * @returns {JSX.Element}
 */
const Input = ({
  placeholder = "Search",
  value,
  onChange,
  onClear,
  containerClassName = "",
  inputClassName = "",
  icon: Icon,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  // Handle controlled or uncontrolled input
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  // Handle clearing the input
  const handleClear = () => {
    setInputValue("");
    if (onClear) onClear();
    if (onChange) onChange({ target: { value: "" } });
  };

  // Handle focus and blur events
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`flex transition-colors duration-150 ease-in-out items-center rounded border-2 h-[36px] os-regular ${
        isFocused ? "border-brand-green" : "border-transparent"
      } bg-panel-input-background ${containerClassName}`}
    >
      {Icon && (
        <div
          className={`flex items-center justify-center transition-colors duration-150 ease-in-out p-2 ${
            isFocused ? "bg-brand-green text-white" : "text-gray-500"
          }`}
        >
          {Icon && <Icon className="w-5 h-5 " />}
        </div>
      )}
      <input
        type="text"
        className={`w-full px-3 py-1 bg-transparent outline-none text-brand-blackLight placeholder-gray-500 ${inputClassName}`}
        placeholder={placeholder}
        value={value !== undefined ? value : inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {(value || inputValue) && (
        <button
          type="button"
          onClick={handleClear}
          className="flex-shrink-0 mr-2 text-gray-400 hover:text-gray-600"
          aria-label="Clear input"
          tabIndex={-1}
        >
          <X className="w-4 h-4" title="Clear" />
        </button>
      )}
    </div>
  );
};

export default Input;
