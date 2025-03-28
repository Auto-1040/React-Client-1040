import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { CloudUpload, Description, Cancel } from '@mui/icons-material';
import { uploadSlip } from '../../services/FileService';
import UploadIcon from '@mui/icons-material/Upload';


interface Upload106FormProps {
  onSuccess: (data: any) => void;
}

const Upload106Form: React.FC<Upload106FormProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    // Simulate file upload and response
    const data=await uploadSlip(file);
    // After successful upload, call onSuccess with the file details
    onSuccess(data);

    setLoading(false);
    setFile(null);
  };

  return (
      <CardContent>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={2}>
          Upload Form 106
        </Typography>
        <Box
          sx={{
            border: '2px dashed #90caf9',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f0f8ff' },
          }}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
          <UploadIcon/>
            <Typography variant="body1" color="textSecondary">
              {file ? file.name : 'Drag & Drop or Click to Upload'}
            </Typography>
          </label>
        </Box>
        {file && (
          <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
            <Description color="primary" />
            <Typography variant="body2">{file.name}</Typography>
            <Cancel color="error" sx={{ cursor: 'pointer' }} onClick={() => setFile(null)} />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, borderRadius: 2 }}
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
        </Button>
      </CardContent>
  );
};

export default Upload106Form;
