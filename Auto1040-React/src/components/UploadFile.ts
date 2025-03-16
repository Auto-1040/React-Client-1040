import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file: File): Promise<void> => {
    try {
        const response = await axios.get( `${API_BASE_URL}/api/s3/presigned-url/upload`, {
          params: { fileName: file.name }
        });

        console.log("Presigned URL received:", response.data);
        
        if (!response.data || !response.data.url) {
            throw new Error("Invalid Presigned URL response");
        }
  
        const presignedUrl:string = response.data.url;
    
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            //setProgress(percent);
          },
        });
  
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  };