const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
const apiKey = import.meta.env.VITE_APP_API_KEY;

const uploadImageCloudinary = async (file) => {
    const uploadData = new FormData();
console.log(cloudName,'bkkkio')
    uploadData.append('file', file);
    uploadData.append('upload_preset', uploadPreset);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: uploadData,
           
        });

        if (!res.ok) {
            throw new Error(`Error uploading image: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Upload failed:', error.message);
        throw error;
    }
};

export default uploadImageCloudinary;
