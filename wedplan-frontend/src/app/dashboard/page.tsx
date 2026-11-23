import { CalendarDays, Heart, Sparkles } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#F8F5F0] px-5 py-14 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-[#E9E0D6] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-20 -z-10 size-96 rounded-full bg-[#EEE5F0] blur-3xl"
      />

      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#351044]/10 bg-white/85 shadow-[0_24px_80px_-40px_rgba(53,16,68,0.35)] md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <div className="mb-7 flex size-12 items-center justify-center rounded-2xl bg-[#F5ECD9] text-[#9B6B13]">
            <Heart size={23} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9B6B13]">
            Welcome to WedPlan
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight tracking-tight text-[#351044] sm:text-4xl lg:text-5xl">
            Your next chapter starts with a plan.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#6D6268] sm:text-base">
            Your wedding dashboard is the place to keep your plans close. Choose
            Dashboard in the top menu to open your personal planning space.
          </p>
          <div className="mt-8 flex items-center gap-3 border-t border-[#351044]/10 pt-5 text-sm text-[#51454F]">
            <Sparkles size={17} className="text-[#C5A16E]" aria-hidden="true" />
            <span>Made for all the little details that make it yours.</span>
          </div>
        </div>

        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[#351044] p-8 sm:min-h-80">
          <div aria-hidden="true" className="absolute -right-12 -top-14 size-56 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-10 size-64 rounded-full border border-white/10" />
          <div className="relative w-full max-w-xs">
            <div className="absolute -right-4 -top-8 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#E8C77F] shadow-xl backdrop-blur-sm">
              <Heart size={22} aria-hidden="true" />
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#E8C77F] text-[#351044]">
                  <CalendarDays size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">YOUR WEDDING</p>
                  <p className="mt-1 font-serif text-lg text-white">A day to remember</p>
                </div>
              </div>
              <div className="mt-6 space-y-3" aria-hidden="true">
                <div className="h-2 w-full rounded-full bg-white/20" />
                <div className="h-2 w-4/5 rounded-full bg-white/20" />
                <div className="h-2 w-3/5 rounded-full bg-white/20" />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-white/65">
                <span>Every detail, in its place</span>
                <Sparkles size={15} className="text-[#E8C77F]" />
              </div>
            </div>
            <p className="mt-5 text-center font-serif text-sm italic tracking-wide text-[#E8C77F]">
              Plan · Book · Celebrate
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
