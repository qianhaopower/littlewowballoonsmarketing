import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-brand-orange text-white shadow-soft hover:opacity-95",
        variant === "secondary" &&
          "bg-white text-brand-ink ring-1 ring-slate-200 hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}
