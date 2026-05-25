import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

 const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully, remove it from the server
        console.log("File uploaded successfully to Cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the file from the server as it failed to upload to Cloudinary
        return null;
    }
 }  

export { uploadOnCloudinary }