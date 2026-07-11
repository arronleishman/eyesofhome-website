"use client";

import { TrackedLink } from "./TrackedLink";
import { siteConfig } from "@/lib/config";

/** Client nav merch link so we can track clicks from the header. */
export function HeaderMerchLink() {
  return (
    <TrackedLink
      href={siteConfig.merchUrl}
      event="merch_click"
      className="transition hover:text-white"
    >
      Merch
    </TrackedLink>
  );
}
