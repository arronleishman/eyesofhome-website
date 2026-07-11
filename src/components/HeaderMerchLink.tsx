"use client";

import { TrackedLink } from "./TrackedLink";
import { siteConfig } from "@/lib/config";

export function HeaderMerchLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <TrackedLink
      href={siteConfig.merchUrl}
      event="merch_click"
      aria-label="Shop Eyes of Home merch"
      className={`transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className ?? ""}`}
      onClick={onNavigate}
    >
      Merch
    </TrackedLink>
  );
}
