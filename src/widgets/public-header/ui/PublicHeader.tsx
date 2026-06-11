import Link from "next/link";

import { Button } from "@/shared/ui";

type PublicHeaderProps = {
  showLoginLink?: boolean;
};

export function PublicHeader({ showLoginLink = true }: PublicHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        className="text-sm font-black text-hae-paper transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hae-gold/70 sm:text-base"
        href="/"
      >
        해질녘
      </Link>
      {showLoginLink ? (
        <Button
          asChild
          className="border-hae-paper/16 bg-hae-paper/8 px-3 font-black text-hae-paper hover:bg-hae-paper hover:text-hae-ink focus-visible:border-hae-gold focus-visible:ring-hae-gold/40"
          size="sm"
          variant="outline"
        >
          <Link href="/login">로그인</Link>
        </Button>
      ) : null}
    </header>
  );
}
