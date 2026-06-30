export async function uploadBase64Asset({ fileName, fileType, fileData }) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary is not configured");
    }

    const formData = new FormData();
    formData.append("file", `data:${fileType};base64,${fileData}`);
    formData.append("upload_preset", uploadPreset);
    formData.append("public_id", fileName);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return response.json();
}

