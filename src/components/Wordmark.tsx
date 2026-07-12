type WordmarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "header";
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs tracking-[0.08em]",
  md: "px-2.5 py-1.5 text-sm tracking-[0.1em]",
  lg: "px-3 py-2 text-base tracking-[0.1em] sm:text-lg",
  header:
    "px-2.5 py-1.5 text-base tracking-[0.12em] sm:px-3.5 sm:py-2 sm:text-xl md:text-2xl",
} as const;

export function Wordmark({ className = "", size = "md" }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-center border border-white font-[family-name:var(--font-display)] uppercase leading-none text-white ${sizeClasses[size]} ${className}`}
    >
      Eyes of Home
    </span>
  );
}
