import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CircularProgress, Divider } from '@mui/material';
import { FileCopy, SaveAlt, Print } from '@mui/icons-material';
import { downloadFileWithPresignedUrl, genrate1040Form } from '../../services/FileService';

interface Generate1040FormProps {
    form106Id: number;
}

const Generate1040Form: React.FC<Generate1040FormProps> = ({ form106Id }) => {
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState<string | null>(null);

    const handleGenerate = async () => {
        try {
            setLoading(true);

            const data = await genrate1040Form(form106Id);
            setFormKey(data.s3Key);
        } catch (err) {
            console.error('Error generating form:', err);
        } finally {
            setLoading(false);
        }

    };

    const handleDownload = async () => {
        if (!formKey) {
            console.error('No form key available for download');
            return;
        }

        try {
            await downloadFileWithPresignedUrl(formKey); 
        } catch (err) {
            console.error('Error downloading form:', err);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, p: 3, boxShadow: 3, borderRadius: 3, backgroundColor: '#f9fafb' }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} color="primary" textAlign="center" mb={3}>
                    Generate 1040 Tax Form
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            borderRadius: 3,
                            minWidth: 150,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#007bb5',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                            },
                        }}
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Form'}
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                {!loading && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: 2,
                                    minWidth: 130,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                startIcon={<SaveAlt />}
                                onClick={handleDownload}

                            >
                                Download
                            </Button>

                        </Box>
                    </Box>
                )}

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <CircularProgress size={40} color="primary" />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Generate1040Form;
