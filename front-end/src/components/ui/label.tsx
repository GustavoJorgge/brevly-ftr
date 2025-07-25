type LabelProps = {
  text: string;
};

export function Label({ text }: LabelProps) {
  return (
    <span className="flex text-xs uppercase text-grayscale-500 mb-2 text-gray-500">
      {text}
    </span>
  );
}
