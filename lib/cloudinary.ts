// =============================================================
// ShopBook - Cloudinary Upload Helper
// =============================================================

export const CLOUDINARY_CONFIG = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "shopbook",
};

// Upload image to Cloudinary via unsigned upload
export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
    formData.append("folder", "shopbook");

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("Upload ảnh thất bại");

    const data = await res.json();
    return data.secure_url;
}

// Generate optimized Cloudinary URL
export function getOptimizedImageUrl(
    url: string,
    options: { width?: number; height?: number; quality?: number } = {}
): string {
    if (!url || !url.includes("cloudinary")) return url;

    const { width = 800, quality = 80 } = options;
    const transforms = `c_fill,w_${width},q_${quality},f_auto`;

    return url.replace("/upload/", `/upload/${transforms}/`);
}
