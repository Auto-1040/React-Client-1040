"use client"

import type React from "react"
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    Link,
    Container,
    Paper,
    useTheme,
    Fade,
    Divider,
} from "@mui/material"
import { UploadFile, AccountCircle, Send, Link as LinkIcon, ArrowForward, CheckCircle } from "@mui/icons-material"
import { useNavigate } from "react-router"

const logoUrl = "/logo.png" // Update with actual logo path

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    const features = [
        "Convert Israeli 106 forms to U.S. 1040 tax forms",
        "Secure document handling with encryption",
        "Accurate tax calculations based on current regulations",
        "Save time with automated form generation",
    ]

    return (
        <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
            {/* Hero Section */}
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    sx={{
                        py: { xs: 6, md: 12 },
                        minHeight: { md: "80vh" },
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={1000}>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <img
                                        src={logoUrl || "/placeholder.svg"}
                                        alt="EZ1040 Logo"
                                        style={{ width: "60px", marginRight: "16px" }}
                                    />
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        fontWeight={700}
                                        color={theme.palette.primary.main}
                                        sx={{ letterSpacing: "-0.5px" }}
                                    >
                                        EZ1040
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h3"
                                    fontWeight={800}
                                    color="textPrimary"
                                    sx={{
                                        mb: 3,
                                        fontSize: { xs: "2rem", md: "3rem" },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Simplify Your U.S. Tax Filing from Israel
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    sx={{
                                        mb: 4,
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Effortlessly convert your Israeli 106 payslip into the U.S. 1040 tax form using cutting-edge AI
                                    technology. Simple, accurate, and fast.
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
                                    {features.map((feature, index) => (
                                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <CheckCircle fontSize="small" color="primary" />
                                            <Typography variant="body2" color="textSecondary">
                                                {feature}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        endIcon={<ArrowForward />}
                                        onClick={() => navigate("dashboard/create-1040")}
                                        sx={{
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                            boxShadow: theme.shadows[4],
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="primary"
                                        onClick={() => navigate("dashboard/user-information/personal")}
                                        sx={{
                                            py: 1.5,
                                            px: 3,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={1500}>
                            <Paper
                                elevation={6}
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    height: { xs: 300, md: 400 },
                                    position: "relative",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}11)`,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "80%",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h5" fontWeight={600} gutterBottom color={theme.palette.primary.main}>
                                        Your Tax Forms, Simplified
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        From Israeli 106 to U.S. 1040 in minutes
                                    </Typography>
                                    <Box
                                        sx={{
                                            mt: 3,
                                            p: 2,
                                            border: `1px dashed ${theme.palette.primary.main}`,
                                            borderRadius: 2,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <UploadFile color="primary" />
                                        <Typography variant="body2">Drag & drop your 106 form here</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>

            {/* Process Section */}
            <Box sx={{ backgroundColor: theme.palette.mode === "light" ? "#f8f9fa" : "#111" }}>
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Typography variant="h4" fontWeight={700} textAlign="center" color="textPrimary" gutterBottom sx={{ mb: 1 }}>
                        How It Works
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        textAlign="center"
                        sx={{ mb: 6, maxWidth: 700, mx: "auto" }}
                    >
                        Our streamlined process makes tax filing quick and easy, even if you're filing from Israel
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: theme.shadows[10],
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: "#fff",
                                        p: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        STEP 1
                                    </Typography>
                                </Box>
                                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                                    <AccountCircle sx={{ fontSize: 60, color: theme.palette.secondary.main, mb: 2 }} />
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Fill in Your Details
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Start by providing your personal information to set up your tax form. We'll guide you through each
                                        step with clear instructions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: theme.shadows[10],
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: "#fff",
                                        p: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        STEP 2
                                    </Typography>
                                </Box>
                                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                                    <UploadFile sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Upload Your Payslip
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Securely upload your Israeli 106 payslip, and our AI technology will automatically extract all the
                                        relevant details for your U.S. tax form.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: theme.shadows[10],
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: "#fff",
                                        p: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        STEP 3
                                    </Typography>
                                </Box>
                                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                                    <Send sx={{ fontSize: 60, color: theme.palette.secondary.main, mb: 2 }} />
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Submit & Generate
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        With one click, generate your 1040 form and review the details. Download your completed form ready
                                        for filing with the IRS.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Resources Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight={700} color="textPrimary" gutterBottom>
                            Helpful Resources
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            We've compiled essential resources to help you understand U.S. tax requirements for Israeli residents and
                            make the filing process smoother.
                        </Typography>
                        <List>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <LinkIcon sx={{ color: theme.palette.primary.main }} />
                                </ListItemIcon>
                                <Link
                                    href="https://www.irs.gov"
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        IRS Official Site
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Official information about U.S. tax requirements and forms
                                    </Typography>
                                </Link>
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <LinkIcon sx={{ color: theme.palette.primary.main }} />
                                </ListItemIcon>
                                <Link
                                    href="https://fintranslator.com/"
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        FinTranslator
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Financial translation services for international tax documents
                                    </Typography>
                                </Link>
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <LinkIcon sx={{ color: theme.palette.primary.main }} />
                                </ListItemIcon>
                                <Link
                                    href="#"
                                    color="inherit"
                                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        Tax Guide for U.S. Citizens in Israel
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Comprehensive guide to understanding your tax obligations
                                    </Typography>
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: theme.palette.mode === "light" ? "#f8f9fa" : "#1a1a1a",
                            }}
                        >
                            <Typography variant="h5" fontWeight={600} gutterBottom color={theme.palette.primary.main}>
                                Frequently Asked Questions
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Do I need to file U.S. taxes if I live in Israel?
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Yes, U.S. citizens and green card holders are required to file U.S. tax returns regardless of where
                                    they live.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    How does the Israeli 106 form relate to the U.S. 1040?
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    The 106 form contains your Israeli income information, which needs to be reported on your U.S. 1040
                                    form. Our system converts this information automatically.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Is my data secure?
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Absolutely. We use bank-level encryption to protect your personal and financial information. Your data
                                    is never shared with third parties.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    py: 8,
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Ready to simplify your tax filing?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                        Join thousands of U.S. citizens in Israel who are saving time and reducing stress with EZ1040.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate("dashboard/create-1040")}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "1rem",
                            boxShadow: theme.shadows[4],
                            backgroundColor: "#fff",
                            color: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Get Started Now
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default HomePage
