export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-12 px-4 mb-2 border border-grayscale-200 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 placeholder:text-grayscale-200 text-sm mb-5"
    />
  );
}
