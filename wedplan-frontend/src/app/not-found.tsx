import Link from "next/link";
import { ArrowRight, Heart, House, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#F8F5F0] px-5 py-16 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#E9E0D6]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-[#E8DDED]/70 blur-3xl"
      />

      <section
        aria-labelledby="not-found-title"
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-[#C5A16E]/40 bg-white/80 text-[#9B6B13] shadow-sm">
          <Heart size={27} strokeWidth={1.7} aria-hidden="true" />
        </div>

        <p className="mt-6 font-serif text-7xl font-semibold tracking-tight text-[#C5A16E] sm:text-8xl">
          404
        </p>
        <h1
          id="not-found-title"
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#351044] sm:text-4xl"
        >
          Looks like this page missed the ceremony.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#6D6268] sm:text-base">
          The page may have moved or the link may be out of date. Let’s get you
          back to planning something lovely.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#351044] px-6 text-sm font-medium text-white transition hover:bg-[#4A1A5C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#351044]"
          >
            <Search size={16} aria-hidden="true" />
            Browse wedding services
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#351044]/20 bg-white/70 px-6 text-sm font-medium text-[#351044] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#351044]"
          >
            <House size={16} aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
