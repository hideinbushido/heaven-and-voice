import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold uppercase tracking-[.14em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        metal: "metal rounded-full",
        outline: "rounded-full border border-gold/40 text-ivory hover:border-gold hover:bg-gold/10",
        ghost: "text-ivory hover:text-gold",
        link: "text-ivory underline-offset-[6px] decoration-gold underline hover:text-gold",
      },
      size: { default: "h-11 px-6 text-[12px]", sm: "h-9 px-4 text-[11px]", lg: "h-14 px-8 text-[13px]", icon: "h-11 w-11" },
    },
    defaultVariants: { variant: "metal", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
