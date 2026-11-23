"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
    images: string[];
    serviceTitle: string;
};

export default function ServiceImageGallery({ images, serviceTitle }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const activeImage = images[selectedIndex] || images[0];

    if (!activeImage) {
        return <div className="aspect-3/2 rounded-xl bg-muted" />;
    }

    return (
        <div className="space-y-3">
            <div className="relative aspect-3/2 overflow-hidden rounded-xl bg-muted">
                <Image
                    src={activeImage}
                    alt={`${serviceTitle} photo ${selectedIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

            {images.length > 1 && (
                <div
                    role="group"
                    aria-label={`${serviceTitle} photo gallery`}
                    className="flex gap-3 overflow-x-auto pb-1"
                >
                    {images.map((image, index) => (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            aria-label={`Show photo ${index + 1} of ${serviceTitle}`}
                            aria-pressed={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative aspect-3/2 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition md:w-28 ${
                                selectedIndex === index
                                    ? "border-amber-600 ring-2 ring-amber-600/20"
                                    : "border-transparent hover:border-amber-300"
                            }`}
                        >
                            <Image
                                src={image}
                                alt=""
                                fill
                                sizes="112px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
