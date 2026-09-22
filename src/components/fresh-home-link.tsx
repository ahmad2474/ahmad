"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FreshHomeLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: "/" | `/#${string}`;
};

export function FreshHomeLink({ href, onClick, ...props }: FreshHomeLinkProps) {
  const pathname = usePathname();

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      pathname === "/" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();
    window.location.assign(href);
  };

  return <Link href={href} onClick={navigate} {...props} />;
}
