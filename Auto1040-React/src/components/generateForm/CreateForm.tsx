import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import UploadForm from "./UploadForm";
import ViewDetails from "./ViewDetails";
import Generate1040Form from "./Generate1040Form";


const CreateForm: React.FC = () => {
    const [form106Data, setForm106Data] = useState<any>({s3Key: "e529767d-957f-42d1-8b60-f7484867dc45.pdf"});

    const handleUploadSuccess = (data: any) => {
        setForm106Data(data);
    };


    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 3, textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>
                1040 Tax Form Generator
            </Typography>
            {form106Data ? (
                <Generate1040Form form106Id={form106Data.id} />
            ) :
                <UploadForm onSuccess={handleUploadSuccess} />
            }
        </Box>
    );
};

export default CreateForm;
