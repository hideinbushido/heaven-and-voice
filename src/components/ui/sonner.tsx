import { Toaster as Sonner } from "sonner";
type ToasterProps = React.ComponentProps<typeof Sonner>;
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner theme="dark" position="bottom-center" toastOptions={{ classNames: {
    toast: "!bg-night-800 !border !border-gold/30 !text-ivory !rounded-none !font-sans",
    description: "!text-mist",
  } }} {...props} />
);
export { Toaster };
