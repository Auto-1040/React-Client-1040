import React, {  useState } from 'react';
import { Box, Button, CardContent, CircularProgress, Divider, Alert } from '@mui/material';
import { SaveAlt } from '@mui/icons-material';
import { downloadFileWithPresignedUrl, genrate1040Form } from '../../services/FileService';

interface Generate1040FormProps {
    form106Id: number;
}

const Generate1040Form: React.FC<Generate1040FormProps> = ({ form106Id }) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleGenerateAndDownload = async () => {
        if (loading) return;
        const data = await handleGenerate();
        if (!data) return;
        await handleDownload(data.s3Key);

    }

    const handleGenerate = async () => {
        try {
            setLoading(true);
            setErrorMessage(null);
            setSuccessMessage(null);

            const data = await genrate1040Form(form106Id);
            setSuccessMessage('Form 1040 generated successfully!');
            return data;
        } catch (err) {
            console.error('Error generating form:', err);
            setErrorMessage('Failed to generate Form 1040. Please try again.');
            return false;
        }
    };

    const handleDownload = async (formKey:string) => {
        if (!formKey) {
            setErrorMessage('No form available for download. Please generate the form first.');
            return;
        }

        try {
            setErrorMessage(null);
            await downloadFileWithPresignedUrl(formKey);
            setSuccessMessage('Form 1040 downloaded successfully!');
        } catch (err) {
            console.error('Error downloading form:', err);
            setErrorMessage('Failed to download Form 1040. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardContent>
            <Divider sx={{ my: 2 }} />

            {/* Alerts */}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Generate Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                        borderRadius: 50,
                        minWidth: 200,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        padding: '10px 20px',
                        backgroundColor: (theme => theme.palette.primary.main),
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            boxShadow: '0 6px 16px rgba(21, 101, 192, 0.5)',
                        },
                        '&:disabled': {
                            backgroundColor: '#b0bec5',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={() => { handleGenerateAndDownload() }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        <>
                            <SaveAlt sx={{ fontSize: 24 }} />
                            Generate & Download
                        </>
                    )}
                </Button>
            </Box>
        </CardContent>
    );
};

export default Generate1040Form;