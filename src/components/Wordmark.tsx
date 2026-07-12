type WordmarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "px-2 py-1 text-[11px] tracking-[0.08em] sm:text-xs",
  md: "px-2.5 py-1.5 text-xs tracking-[0.1em] sm:px-3 sm:text-sm",
  lg: "px-3 py-2 text-sm tracking-[0.1em] sm:px-4 sm:text-base",
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
