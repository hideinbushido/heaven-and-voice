import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => (
  <input type={type} ref={ref} className={cn("flex h-12 w-full border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-[17px] text-ivory placeholder:text-mist/60 transition-colors focus-visible:border-gold focus-visible:outline-none", className)} {...props} />
));
Input.displayName = "Input";
export { Input };
