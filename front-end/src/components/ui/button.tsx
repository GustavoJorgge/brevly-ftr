import { Component, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = tv({
  base: "text-white rounded-lg bg-blue-600  rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

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

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ size, asChild, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={buttonVariants({ size, className })} {...props} />
  );
}
