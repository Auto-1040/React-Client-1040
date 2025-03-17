import React, { useState } from 'react';
import {  Box,  IconButton } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { uploadFile } from '../services/UploadFile';
import { AxiosProgressEvent } from 'axios';
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import UploadIcon from '@mui/icons-material/Upload';

const SlipUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);



  const handleFileChange = (newValue: File | null) => {
    setSelectedFile(newValue);
  };

  const uploadProgress= (progressEvent: AxiosProgressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      console.log('Upload progress:', percent);
      setProgress(percent);
  }
  

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    setUploading(true);
    try {
      await uploadFile(selectedFile,uploadProgress);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <MuiFileInput
        value={selectedFile}
        onChange={handleFileChange}
        placeholder="Select a file"
        sx={{
          width: '100%',
          maxWidth: 400,
          '& .MuiFileInput-placeholder': {
            color: '#888',
            fontStyle: 'italic',
          },
          '& input': {
            padding: '10px',
            border: '2px dashed #ccc',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          },
        }}
      />
  <IconButton
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{
          mt: 2,
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          padding: '10px',
          borderRadius: '50%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {uploading ? <CircularProgressWithLabel value={progress} />:   <UploadIcon/>}
      </IconButton>
    </Box>
  );
};

export default SlipUpload;