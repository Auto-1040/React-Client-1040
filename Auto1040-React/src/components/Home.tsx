import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid, List, ListItem, ListItemIcon, Link } from "@mui/material";
import { UploadFile, AccountCircle, Send, Link as LinkIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";

const logoUrl = "/logo.png"; // Update with actual logo path

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ backgroundColor: (theme) => theme.palette.background.default, minHeight: "100vh", padding: 4, mt: 8 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: "center", mb: 5 }}>
                <img src={logoUrl} alt="Company Logo" style={{ width: "120px", marginBottom: "16px" }} />
                <Typography variant="h3" fontWeight={700} color="#2e4f7a">
                    Welcome to EZ1040
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, margin: "auto", mt: 1 }}>
                    Effortlessly convert your Israeli 106 payslip into the U.S. 1040 tax form using cutting-edge AI technology. Simple, accurate, and fast.
                </Typography>
                <Button variant="contained" size="large" sx={{ backgroundColor: "#c62d21", mt: 3, borderRadius: 2 }} onClick={() => navigate("dashboard/create-1040")}>
                    Get Started
                </Button>
            </Box>

            {/* Steps Section */}
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <AccountCircle sx={{ fontSize: 50, color: "#c62d21" }} />
                            <Typography variant="h6" fontWeight={600} mt={1}>
                                Fill in Your Details
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Start by providing your personal information to set up your tax form.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <UploadFile sx={{ fontSize: 50, color: "#5e98d4" }} />
                            <Typography variant="h6" fontWeight={600} mt={1}>
                                Upload Your Payslip
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Securely upload your payslip, and we'll extract the relevant details.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <Send sx={{ fontSize: 50, color: "#8a1f17" }} />
                            <Typography variant="h6" fontWeight={600} mt={1}>
                                Submit & Generate
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                With one click, generate your 1040 form and review the details.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Useful Links Section */}
            <Box sx={{ mt: 6, textAlign: "center" }}>
                <Typography variant="h5" fontWeight={600} color="#2e4f7a">
                    Helpful Resources
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Check out these sites for tax form assistance:
                </Typography>
                <List sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <ListItem>
                        <ListItemIcon>
                            <LinkIcon sx={{ color: "#5e98d4" }} />
                        </ListItemIcon>
                        <Link href="https://www.irs.gov" target="_blank" rel="noopener" color="inherit">
                            IRS Official Site
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LinkIcon sx={{ color: "#5e98d4" }} />
                        </ListItemIcon>
                        <Link href="https://fintranslator.com/" target="_blank" rel="noopener" color="inherit">
                            FinTranslator
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default HomePage;
