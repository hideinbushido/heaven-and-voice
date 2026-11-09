import * as React from "react";
import { cn } from "@/lib/utils";
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("flex min-h-[110px] w-full resize-y border border-gold/25 bg-night-950/40 p-3 font-sans text-[16px] text-ivory placeholder:text-mist/60 focus-visible:border-gold focus-visible:outline-none", className)} {...props} />
));
Textarea.displayName = "Textarea";
export { Textarea };
