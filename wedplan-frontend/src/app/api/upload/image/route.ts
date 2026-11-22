import { NextResponse } from "next/server";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { message: "Image uploads need server configuration. Set IMGBB_API_KEY in .env and restart the dev server." },
            { status: 503 },
        );
    }

    try {
        const formData = await request.formData();
        const image = formData.get("image");
        if (!(image instanceof File) || !image.type.startsWith("image/")) {
            return NextResponse.json({ message: "Choose a valid image file" }, { status: 400 });
        }
        if (image.size > MAX_IMAGE_BYTES) {
            return NextResponse.json({ message: "Image must be 8 MB or smaller" }, { status: 413 });
        }

        const providerForm = new FormData();
        providerForm.append("image", image);
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: providerForm });
        const result = await response.json();
        if (!response.ok || !result.success || !result.data?.display_url) {
            return NextResponse.json({ message: "Image upload failed" }, { status: 502 });
        }
        return NextResponse.json({ url: result.data.display_url });
    } catch {
        return NextResponse.json({ message: "Unable to process image upload" }, { status: 400 });
    }
}
