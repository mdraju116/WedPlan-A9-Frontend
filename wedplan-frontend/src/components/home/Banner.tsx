import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Sparkles } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative isolate overflow-hidden bg-[#fbf7f1]">
            <div aria-hidden="true" className="absolute -right-40 -top-44 -z-10 size-[34rem] rounded-full bg-[#f5d9cc]/55 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-48 left-[22%] -z-10 size-[32rem] rounded-full bg-[#eee1c6]/65 blur-3xl" />

            <div className="mx-auto grid min-h-[min(720px,calc(100svh-5rem))] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12">
                <div className="relative z-10 max-w-2xl">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ead9ce] bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#8a4854] shadow-sm">
                        <Sparkles className="size-4 text-[#c17668]" />
                        YOUR STORY, BEAUTIFULLY CELEBRATED
                    </div>

                    <h1 className="font-serif text-5xl font-medium leading-[1.02] tracking-[-0.045em] text-[#35213b] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                        Make room
                        <span className="mt-1 block italic text-[#b74f65]">for the</span>
                        <span className="block">beautiful.</span>
                    </h1>

                    <p className="mt-7 max-w-lg text-base leading-8 text-[#71646e] sm:text-lg">
                        Your wedding should feel like your story. Find the people and thoughtful details that bring your day to life.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Link
                            href="#service-categories-heading"
                            className="group inline-flex items-center gap-3 rounded-full bg-[#392340] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#392340]/15 transition hover:-translate-y-0.5 hover:bg-[#513052]"
                        >
                            Find your categories
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-[#8a4854] transition hover:bg-white/70"
                        >
                            Start planning <ArrowUpRight className="size-4" />
                        </Link>
                    </div>

                    <div className="mt-11 flex flex-wrap gap-2.5" aria-label="Popular wedding services">
                        {["Venues", "Photography", "Florals", "Catering"].map((item) => (
                            <span key={item} className="rounded-full border border-[#e8ddd3] bg-white/55 px-3.5 py-2 text-xs font-medium text-[#756873]">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[34rem] pb-7 pl-3 pr-5 pt-3 sm:pb-10 sm:pl-7 sm:pr-8 sm:pt-7 lg:ml-auto">
                    <div aria-hidden="true" className="absolute right-0 top-0 size-36 rounded-full bg-[#e9c49f]/70 sm:size-48" />
                    <div aria-hidden="true" className="absolute bottom-0 left-0 size-32 rounded-full bg-[#d99a91]/65 sm:size-44" />
                    <div
                        role="img"
                        aria-label="A couple sharing a moment at their wedding"
                        className="relative aspect-[0.95] overflow-hidden rounded-t-[48%] rounded-b-[2rem] bg-[#503b42] bg-cover bg-[center_38%] shadow-2xl shadow-[#432d3a]/20"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=1500&auto=format&fit=crop')" }}
                    >
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#291b2b]/60 via-transparent to-[#291b2b]/5" />
                        <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5d6a7]">The beginning of forever</p>
                            <p className="mt-2 font-serif text-2xl sm:text-3xl">Made to feel like you.</p>
                        </div>
                    </div>

                    <div className="absolute -left-1 top-[18%] max-w-[14rem] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl shadow-[#38243a]/10 backdrop-blur sm:-left-8 sm:p-5">
                        <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-[#f8e8e1] text-[#b74f65]">
                            <Heart className="size-5" />
                        </span>
                        <p className="font-serif text-lg text-[#35213b]">All your details, in one place</p>
                        <p className="mt-1 text-xs leading-5 text-[#786c73]">Discover trusted wedding professionals for every part of your day.</p>
                    </div>

                    <div className="absolute -right-1 bottom-[17%] rounded-2xl bg-[#f2d29e] px-4 py-3 shadow-lg shadow-[#432d3a]/10 sm:-right-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#765538]">Your day, your way</p>
                        <p className="mt-1 font-serif text-lg text-[#392b36]">Let&apos;s make it lovely.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
