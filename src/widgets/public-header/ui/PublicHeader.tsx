import Link from "next/link";

import { Button } from "@/shared/ui";

type PublicHeaderProps = {
  authLinks?: "all" | "login" | "signup" | "none";
};

export function PublicHeader({ authLinks = "all" }: PublicHeaderProps) {
  const showLoginLink = authLinks === "all" || authLinks === "login";
  const showSignupLink = authLinks === "all" || authLinks === "signup";

  return (
    <header className="flex items-center justify-between">
      <Link
        className="text-sm font-black text-hae-paper transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hae-gold/70 sm:text-base"
        href="/"
      >
        해질녘
      </Link>
      {authLinks !== "none" ? (
        <nav className="flex items-center gap-2" aria-label="계정">
          {showLoginLink ? (
            <Button
              asChild
              className="border-hae-paper/16 bg-hae-paper/8 px-3 font-black text-hae-paper hover:bg-hae-paper hover:text-hae-ink focus-visible:border-hae-gold focus-visible:ring-hae-gold/40"
              size="lg"
              variant="outline"
            >
              <Link href="/login">로그인</Link>
            </Button>
          ) : null}
          {showSignupLink ? (
            <Button
              asChild
              className="bg-hae-gold px-3 font-black text-hae-ink hover:bg-hae-paper focus-visible:border-hae-gold focus-visible:ring-hae-gold/40"
              size="lg"
            >
              <Link href="/signup">회원가입</Link>
            </Button>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
