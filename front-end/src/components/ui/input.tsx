import { WarningDiamondIcon } from "@phosphor-icons/react";
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
            className={`flex items-center border border-gray-300 active:border-blue-800 focus:border-blue-800 rounded-md px-4 mb-2  ${
              error
                ? "border-red-700 active:border-red-700 focus:border-red-700"
                : ""
            } ${className}`}
          >
            <span className="text-grayscale-400">{prefix}</span>
            <input
              ref={ref}
              type="text"
              disabled={disabled}
              className="w-full h-12 outline-none bg-transparent disabled:opacity-50"
              {...inputProps}
            />
          </div>
          {error && (
            <span className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <WarningDiamondIcon size={20} color="#B12C4D" />
              {error}
            </span>
          )}
        </div>
      );
    }

    return (
      <div>
        <input
          ref={ref}
          disabled={disabled}
          className={`w-full h-12 border border-gray-300 active:border-blue-800 focus:border-blue-800 rounded-lg p-4 mb-2 focus:outline-none placeholder:text-grayscale-400   ${
            error
              ? "border-red-700 active:border-red-700 focus:border-red-700"
              : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <WarningDiamondIcon size={20} color="#B12C4D" />
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
