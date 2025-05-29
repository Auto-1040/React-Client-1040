import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Fade,
} from '@mui/material';
import { Description, Cancel } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadSlip } from '../../services/FileService';

interface Upload106FormProps {
  onSuccess: (data: any) => void;
}

type FormStatus = 'Idle' | 'File Ready' | 'Uploading' | 'Success' | 'Error';

const Upload106Form: React.FC<Upload106FormProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>('Idle');
  const [message, setMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
        setFormStatus('File Ready');
      } else {
        setError('Only PDF files are allowed.');
        setFormStatus('Error');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setFormStatus('Uploading');
    setMessage("We're processing your form. You’ll receive an email when it's ready.");

    try {
      const data = await uploadSlip(file);
      setFile(null);
      setFormStatus('Success');
      setMessage('Upload successful!');
      onSuccess(data);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again later.');
      setFormStatus('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
      setFormStatus('File Ready');
    } else {
      setError('Only PDF files are allowed.');
      setFormStatus('Error');
    }
  };

  return (
    <CardContent>
      <Typography variant="h5" fontWeight={600} textAlign="center" mb={2}>
        Upload Form 106
      </Typography>

      <Chip
        label={`Status: ${formStatus}`}
        color={
          formStatus === 'Idle'
            ? 'default'
            : formStatus === 'File Ready'
            ? 'info'
            : formStatus === 'Uploading'
            ? 'primary'
            : formStatus === 'Success'
            ? 'success'
            : 'error'
        }
        variant="outlined"
        sx={{ mb: 2 }}
      />

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
        <label htmlFor="file-input" style={{ display: 'block', width: '100%' }}>
          <UploadIcon fontSize="large" color={isDragging ? 'primary' : 'action'} />
          <Typography variant="body1" mt={1}>
            {isDragging ? 'Drop your file here' : file ? file.name : 'Drag & Drop or Click to Upload'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Only PDF files are accepted
          </Typography>
        </label>
      </Box>

      {file && (
        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
          <Description color="primary" />
          <Typography variant="body2">{file.name}</Typography>
          <Cancel color="error" sx={{ cursor: 'pointer' }} onClick={() => {
            setFile(null);
            setFormStatus('Idle');
          }} />
        </Box>
      )}

      {message && (
        <Fade in={!!message}>
          <Alert severity="info" sx={{ mt: 2 }}>
            {message}
          </Alert>
        </Fade>
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
