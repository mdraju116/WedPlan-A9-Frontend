import Link from "next/link";
import { Camera, Flower2, MapPinned, Scissors, Shirt, Utensils } from "lucide-react";

const categories = [
    { name: "Photography & Videography", icon: Camera, tone: "bg-rose-50 text-rose-700" },
    { name: "Wedding Venues", icon: MapPinned, tone: "bg-amber-50 text-amber-700" },
    { name: "Decoration & Florists", icon: Flower2, tone: "bg-emerald-50 text-emerald-700" },
    { name: "Catering Services", icon: Utensils, tone: "bg-orange-50 text-orange-700" },
    { name: "Makeup & Styling", icon: Scissors, tone: "bg-fuchsia-50 text-fuchsia-700" },
    { name: "Wedding Fashion", icon: Shirt, tone: "bg-sky-50 text-sky-700" },
];

export default function ServiceCategories() {
    return (
        <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8" aria-labelledby="service-categories-heading">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B49360]">Find your team</p>
                    <h2 id="service-categories-heading" className="mt-3 font-serif text-3xl text-[#302820] sm:text-4xl">Wedding services for every detail</h2>
                    <p className="mt-3 text-sm leading-6 text-[#766D63]">Explore trusted professionals by the service you need.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map(({ name, icon: Icon, tone }) => (
                        <Link key={name} href={`/services?category=${encodeURIComponent(name)}`} className="group flex items-center gap-4 rounded-xl border border-[#E9E0D4] bg-[#FAF8F4] p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                            <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${tone}`}><Icon className="size-5" /></span>
                            <span className="font-medium text-[#302820]">{name}</span>
                            <span aria-hidden="true" className="ml-auto text-[#B49360] transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
