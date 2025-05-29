import { useContext, useEffect } from "react";
import { Container, Typography, Card, CardContent, IconButton, Alert, CircularProgress, Box } from "@mui/material";
import { Download, Visibility, Description, Delete } from "@mui/icons-material";
import { fetchPaySlipsByUserId, deletePaySlip } from "../store/PaySlipSlice";
import { AppDispatch, RootStore } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "./user/UserContext";
import { downloadFileWithPresignedUrl, viewFileWithPresignedUrl } from "../services/FileService";

const ViewForms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { paySlips, loading, error } = useSelector((state: RootStore) => state.paySlips);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const userId = user.id;
    dispatch(fetchPaySlipsByUserId(userId ?? 0));
  }, [dispatch, user.id]);

  // Sort pay slips by taxYear in descending order
  const sortedPaySlips = [...paySlips].sort((a, b) => b.taxYear - a.taxYear);

  const handleView=async(fileName: string) => {
    try {
      await viewFileWithPresignedUrl(fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const handleDownload = async (fileName: string) => {
    try {
      await downloadFileWithPresignedUrl(fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deletePaySlip(id));
  };



  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Keeping previous tax forms is crucial in case of an IRS audit. Your uploaded forms are securely stored here.
      </Alert>
      {error && <Typography color="error">Error: {error}</Typography>}
      <Typography variant="h5" gutterBottom>
        Your Archived Tax Forms (106)
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        sortedPaySlips.map((paySlip) => (
          <Box key={paySlip.id} sx={{ mb: 2 }}>
            <Card elevation={3} sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Description color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Tax Year: {paySlip.taxYear}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded on: {paySlip.createdAt.split("T")[0]}
                </Typography>
              </CardContent>
              <IconButton sx={{ color: "#5e98d4" }} onClick={() => handleView(paySlip.s3Key)}>
                <Visibility />
              </IconButton>
              <IconButton color="primary" onClick={() => handleDownload(paySlip.s3Key)}>
                <Download />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(paySlip.id)}>
                <Delete />
              </IconButton>
            </Card>
          </Box>
        ))
      )}
    </Container>
  );
};

export default ViewForms;