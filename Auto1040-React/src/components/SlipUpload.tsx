import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { uploadFile } from './UploadFile';

const SlipUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    await uploadFile(selectedFile);
  };

  return (
    <Box>
      <input
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default SlipUpload;