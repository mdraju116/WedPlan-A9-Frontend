import Image from "next/image";

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552",
        alt: "Romantic wedding ceremony",
        title: "Beautiful Moments",
    },
    {
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
        alt: "Elegant wedding table decoration",
        title: "Elegant Details",
    },
    {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
        alt: "Wedding celebration",
        title: "Timeless Celebrations",
    },
    {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552",
        alt: "Wedding floral decoration",
        title: "Dreamy Decorations",
    },
];

export default function WeddingGallery() {
    return (
        <section className="bg-[#F8F5F0] px-6 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#B89562]">
                        A Little Inspiration
                    </p>

                    <h2 className="font-serif text-3xl text-[#332B25] md:text-5xl">
                        Moments Worth Remembering
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#81766D] md:text-base">
                        Explore beautiful wedding moments and discover inspiration
                        for creating your own unforgettable celebration.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {galleryImages.map((item, index) => (
                        <div
                            key={item.title}
                            className={`group relative overflow-hidden ${
                                index % 2 === 0 ? "lg:mt-0" : "lg:mt-10"
                            }`}
                        >
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                <h3 className="absolute bottom-6 left-5 font-serif text-xl text-white">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}