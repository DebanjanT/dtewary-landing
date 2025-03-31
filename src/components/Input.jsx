import { useState } from "react";
import { X } from "lucide-react";

/**
 * Enhanced Input/Textarea component with multiple variants and search functionality
 * @param {Object} props - Component props
 * @param {string} props.prefix - Prefix text for the input
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Change handler for the input
 * @param {function} props.onClear - Function to call when clear button is clicked
 * @param {Object} props.containerClassName - Additional classes for the container
 * @param {Object} props.inputClassName - Additional classes for the input
 * @param {React.ReactNode} props.icon - Custom icon to display
 * @param {boolean} props.isTextarea - Whether to render as textarea instead of input
 * @param {string} props.variant - Design variant ('default' or 'outline')
 * @param {number} props.rows - Number of rows for textarea (default: 3)
 * @returns {JSX.Element}
 */
const Input = ({
  placeholder = "",
  value,
  onChange,
  onClear,
  containerClassName = "",
  prefix = "",
  inputClassName = "",
  icon: Icon,
  isTextarea = false,
  variant = "default",
  rows = 3,
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

  // Define styles based on variant
  const getContainerStyles = () => {
    const baseStyles =
      "flex transition-colors duration-150 ease-in-out items-center rounded os-regular";
    const heightStyles = isTextarea ? "" : "h-[36px]";

    if (variant === "outline") {
      return `${baseStyles} ${heightStyles} ${
        isFocused ? "border-brand-green" : "border-gray-400"
      } bg-white  border ${containerClassName}`;
    }

    return `${baseStyles} ${heightStyles} ${
      isFocused ? "border-brand-green" : "border-transparent"
    } bg-panel-input-background  border-2 ${containerClassName}`;
  };

  const getIconStyles = () => {
    const baseStyles =
      "flex items-center justify-center transition-colors duration-150 ease-in-out h-[36px] min-w-[36px] p-2 rounded-l";

    if (variant === "outline") {
      return `${baseStyles} text-black ${isFocused ? "bg-brand-green/20" : ""}`;
    }

    return `${baseStyles} ${
      isFocused ? "bg-brand-green text-white" : "text-gray-500"
    }`;
  };

  const getInputStyles = () => {
    const baseStyles =
      "w-full px-3 py-1 bg-transparent outline-none placeholder-gray-500";

    if (variant === "outline") {
      return `${baseStyles} text-blackLight ${inputClassName}`;
    }

    return `${baseStyles} text-brand-blackLight ${inputClassName}`;
  };

  // Render either input or textarea based on isTextarea prop
  const renderInputElement = () => {
    const commonProps = {
      placeholder,
      value: value !== undefined ? value : inputValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: getInputStyles(),
      ...props,
    };

    if (isTextarea) {
      return <textarea rows={rows} {...commonProps} />;
    }

    return <input type="text" {...commonProps} />;
  };

  return (
    <div className={getContainerStyles()}>
      {prefix ? (
        <div className={getIconStyles()}>{prefix}</div>
      ) : (
        Icon && (
          <div className={getIconStyles()}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        )
      )}

      {renderInputElement()}

      {(value || inputValue) && (
        <button
          type="button"
          onClick={handleClear}
          className="flex justify-center items-center flex-shrink-0 h-[36px] w-[36px] text-gray-400 hover:text-gray-600"
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
