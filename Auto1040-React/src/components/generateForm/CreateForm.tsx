import React, {  useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, Card, CardContent, Alert,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import UploadForm from "./UploadForm";
import Generate1040Form from "./Generate1040Form";
import { userData } from "../Types";
import UserInfoCard from "./UserInfoCard";

const CreateForm: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [form106Data, setForm106Data] = useState<any>(null);
    const userInfo = useSelector((state: RootStore) => state.userInformation.userInfo) as userData | null;
    const navigate = useNavigate();

    const steps = [
        { label: "Personal Information" },
        { label: "Upload Form 106" },
        { label: "Generate 1040 Tax Form" },
    ];


    const handleFinish = () => {
        // Example: Navigate to a success page or reset the form
        navigate("/"); // Navigate to a success page
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleUploadSuccess = (data: any) => {
        console.log("Uploaded Form 106 Data:", data);
        setForm106Data(data);
        handleNext();
    };

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3, textAlign: "center" }}>
                1040 Tax Form Generator
            </Typography>

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Content */}
            <Card sx={{ marginTop: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {steps[activeStep].label}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {activeStep === 0 && "Please update your personal information to proceed."}
                        {activeStep === 1 && "Upload your Form 106 to continue to the next step."}
                        {activeStep === 2 && "Generate your 1040 Tax Form based on the uploaded data."}
                    </Typography>

                    {activeStep === 0 && (
                        <>
                            <Box sx={{ marginTop: 3 }}>
                                {userInfo ? (
                                    <Alert severity="success" sx={{ marginBottom: 3 }}>
                                        Your personal information is up to date. You can proceed to the next step.
                                    </Alert>
                                ) : (
                                    <Alert severity="info" sx={{ marginBottom: 3 }}>
                                        Please update your personal information before proceeding.
                                    </Alert>
                                )}

                            </Box>
                            <UserInfoCard userInfo={userInfo} />
                        </>
                    )}
                    {activeStep === 1 && <UploadForm onSuccess={handleUploadSuccess} />}

                    {activeStep === 2 && <Generate1040Form form106Id={form106Data.id} />}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                    disabled={
                        (activeStep === 0 && !userInfo) || // Disable if personal info is not updated
                        (activeStep === 1 && !form106Data) // Disable if Form 106 is not uploaded
                    }
                >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateForm;