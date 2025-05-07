import React, { useState, useRef } from 'react';
import { Box, Button, Typography, CardContent, CircularProgress, Alert } from '@mui/material';
import { Description, Cancel } from '@mui/icons-material';
import { uploadSlip } from '../../services/FileService';
import UploadIcon from '@mui/icons-material/Upload';

interface Upload106FormProps {
  onSuccess: (data: any) => void;
}

const Upload106Form: React.FC<Upload106FormProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null); // Clear any previous errors
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const data = await uploadSlip(file);
      onSuccess(data); // Call onSuccess with the uploaded file details
      setFile(null); // Clear the file input after successful upload
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set isDragging to false if we're leaving the dropzone (not its children)
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];

      // Check if the file is a PDF
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  return (
    <CardContent>
      <Typography variant="h5" fontWeight={600} textAlign="center" mb={2}>
        Upload Form 106
      </Typography>
      <Box
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? '#2196f3' : '#90caf9',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          transition: '0.3s',
          backgroundColor: isDragging ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
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
        <label htmlFor="file-input" style={{ display: 'block', width: '100%', height: '100%' }}>
          <UploadIcon fontSize="large" color={isDragging ? "primary" : "action"} />
          <Typography variant="body1" color="textSecondary" mt={1}>
            {isDragging ? "Drop your file here" : file ? file.name : "Drag and Drop or Click to Upload"}
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block" mt={1}>
            Only PDF files are accepted
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
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
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