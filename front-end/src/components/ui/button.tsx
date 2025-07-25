import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "text-white rounded-lg bg-blue-400  rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",

  variants: {
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p1",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

export function Button({
  size,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={buttonVariants({ size, className })} {...props} />;
}
