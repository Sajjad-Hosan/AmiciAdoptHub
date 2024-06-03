import { v2 as cloudinary } from "cloudinary";
import { useState } from "react";

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUD_NAME,
  api_key: import.meta.env.VITE_API_KEY,
  api_secret: import.meta.env.VITE_API_SECRET,
});
const useCloudinary = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  cloudinary.v2.uploader.upload(
    url,
    { upload_preset: "my_preset" },
    (error, result) => {
      if (error) {
        return setResult(error);
      }
      setResult(result);
      console.log(result, error);
    }
  );
  return [setUrl, result];
};

export default useCloudinary;
