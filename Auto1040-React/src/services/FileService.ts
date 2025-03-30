import axios, { AxiosProgressEvent } from "axios";
import { withTemporaryAuthHeaderRemoval } from "./AuthUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadSlip = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file); 

    const response = await axios.post(`${API_BASE_URL}/api/payslip/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Slip uploaded:", response);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export const genrate1040Form = async (slipId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/OutputForm/generate?paySlipId=${slipId}`)
    console.log("Form Generated:", response);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error generating form:', error);
  }

}

export const uploadFileWithPresignedUrl = async (file: File): Promise<void> => {
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

      });
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
};

export const downloadFileWithPresignedUrl = async (fileName: string): Promise<void> => {
  try {
    // Use getPresignedUrl to fetch the presigned URL for downloading
    const presignedUrl = await getPresignedUrl(fileName, 'download');

    console.log("Presigned URL received for download:", presignedUrl);

    await withTemporaryAuthHeaderRemoval(async () => {
      const downloadResponse = await axios.get(presignedUrl, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          console.log(`Download progress: ${Math.round((progressEvent.loaded * 100))}%`);
        },
      });

      // Create a blob URL and trigger the download
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

export const viewFileWithPresignedUrl = async (fileName: string): Promise<void> => {
  try {
    
    const presignedUrl: string = await getPresignedUrl(fileName,"download");;
      // Open the file in a new tab
      window.open(presignedUrl, "_blank");
    
  } catch (error) {
    console.error("Error viewing file:", error);
  }
};

const getPresignedUrl = async (fileName: string, action: 'upload' | 'download'): Promise<string> => {
  try {
    const endpoint = action === 'upload' ? 'upload' : 'download';
    const response = await axios.get(`${API_BASE_URL}/api/s3/presigned-url/${endpoint}`, {
      params: { fileName },
    });

    console.log(`Presigned URL received for ${action}:`, response.data);

    if (!response.data || !response.data.url) {
      throw new Error("Invalid Presigned URL response");
    }

    return response.data.url;
  } catch (error) {
    console.error(`Error getting presigned URL for ${action}:`, error);
    throw new Error(`Failed to get presigned URL for ${action}`);
  }
};