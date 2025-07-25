import { forwardRef } from "react";

type BaseInputProps = {
  error?: string;
  disabled?: boolean;
  className?: string;
};

type RegularInputProps = BaseInputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    prefix?: never;
  };

type PrefixInputProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> & {
    prefix: string;
    type?: never;
    placeholder?: never;
  };

type InputProps = RegularInputProps | PrefixInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, disabled = false, className = "", ...props }, ref) => {
    if ("prefix" in props && props.prefix) {
      const { prefix, ...inputProps } = props;
      return (
        <div>
          <div
            className={`flex items-center border border-grayscale-300 rounded-md px-4 mb-2 focus-within:ring-2 focus-within:ring-blue-base ${
              error ? "border-danger" : ""
            } ${className}`}
          >
            <span className="text-grayscale-400">{prefix}</span>
            <input
              ref={ref}
              type="text"
              disabled={disabled}
              className="w-full h-12 outline-none border-none bg-transparent disabled:opacity-50"
              {...inputProps}
            />
          </div>
        </div>
      );
    }

    // Input regular
    return (
      <div>
        <input
          ref={ref}
          disabled={disabled}
          className={`w-full h-12 border border-grayscale-300 rounded-lg p-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-base placeholder:text-grayscale-400 disabled:opacity-50 ${
            error ? "border-danger" : ""
          } ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
