import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" };
export const Button = forwardRef<HTMLButtonElement, Props>(({ variant = "primary", className = "", ...props }, ref) => <button ref={ref} className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variant === "primary" ? "bg-[var(--orange)] text-white hover:bg-[#df6410]" : variant === "secondary" ? "border border-[var(--navy)] bg-white text-[var(--navy)] hover:bg-[#edf2f4]" : "text-[var(--navy)] hover:bg-[#eef1f1]"} ${className}`} {...props} />);
Button.displayName = "Button";
