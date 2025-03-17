import axios, { AxiosProgressEvent } from "axios";
import { withTemporaryAuthHeaderRemoval } from "./AuthUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file: File,uploadProgress:(progressEvent: AxiosProgressEvent) => void): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/s3/presigned-url/upload`, {
      params: { fileName: file.name }
    });

    console.log("Presigned URL received:", response.data);

    if (!response.data || !response.data.url) {
      throw new Error("Invalid Presigned URL response");
    }

    const presignedUrl: string = response.data.url;

    await withTemporaryAuthHeaderRemoval(async () => {
      await axios.put(presignedUrl, file, {
        headers: {
          'content-type': 'application/pdf'
        },
        onUploadProgress:uploadProgress
      });
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
};