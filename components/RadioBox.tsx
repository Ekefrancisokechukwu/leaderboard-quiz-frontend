import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const RadioBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, ...props }, ref) => {
    return (
      <div ref={ref} className="flex items-center flex-shrink-0">
        <input
          type="radio"
          className="peer sr-only" // Hide the default radio button
          id={id}
          {...props}
        />
        <label
          htmlFor={id}
          className="size-[1.3rem] before:scale-0 before:transition-all before:duration-300 peer-checked:before:scale-100 hover:border-gray-900 relative before:inline-block before:size-[.8rem] grid place-items-center before:rounded-full peer-checked:before:bg-gray-900 before:bg-transparent  cursor-pointer border-2 rounded-full peer-checked:border-gray-900"
        ></label>
      </div>
    );
  }
);

RadioBox.displayName = "RadioBox";

export default RadioBox;
