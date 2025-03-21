import axios, { AxiosProgressEvent } from "axios";
import { withTemporaryAuthHeaderRemoval } from "./AuthUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file: File, uploadProgress: (progressEvent: AxiosProgressEvent) => void): Promise<void> => {
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
        onUploadProgress: uploadProgress
      });
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
};

export const downloadFile = async (fileName: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/s3/presigned-url/download`, {
      params: { fileName }
    });

    console.log("Presigned URL received:", response.data);

    if (!response.data || !response.data.url) {
      throw new Error("Invalid Presigned URL response");
    }

    const presignedUrl: string = response.data.url;

    await withTemporaryAuthHeaderRemoval(async () => {
      const downloadResponse = await axios.get(presignedUrl, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          console.log(`Download progress: ${Math.round((progressEvent.loaded * 100))}%`);
        }
      });

      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Error downloading file');
  }
};