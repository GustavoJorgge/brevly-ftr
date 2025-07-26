// ui/label.tsx
interface LabelProps {
  text: string;
  isFocused?: boolean;
  hasError?: boolean;
}

export function Label({
  text,
  isFocused = false,
  hasError = false,
}: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium mb-1 transition-colors ${
        hasError
          ? "text-red-800"
          : isFocused
          ? "text-blue-800"
          : "text-gray-500"
      }`}
    >
      {text}
    </label>
  );
}
