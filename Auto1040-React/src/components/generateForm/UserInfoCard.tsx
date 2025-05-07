import React from "react";
import { Grid, Card, CardContent, Typography, Link } from "@mui/material";
import { userData } from "../Types";

interface UserInfoCardProps {
  userInfo: userData | null;
  
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userInfo }) => {
  return (
    <Grid container spacing={2}>
      {/* Personal Information */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Personal Information</Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo ? (
                <>
                  <strong>Name:</strong> {userInfo.firstName} {userInfo.middleInitial} {userInfo.lastName}
                  <br />
                  <strong>SSN:</strong> {userInfo.ssn}
                  <br />
                  <strong>Filing Status:</strong> {userInfo.filingStatus}
                </>
              ) : (
                "No personal information available."
              )}
            </Typography>
            <Link
              href="/dashboard/user-information/personal"
              sx={{
                display: "block",
                marginTop: 2,
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Update Personal Information
            </Link>
          </CardContent>
        </Card>
      </Grid>

      {/* Address Information */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body2" color="text.secondary">
             
                
                  <strong>Street:</strong> {userInfo?.streetNumber} {userInfo?.streetName}
                  <br />
                  {userInfo?.apartmentNumber && (
                    <>
                      <strong>Apartment:</strong> {userInfo?.apartmentNumber}
                      <br />
                    </>
                  )}
                  <strong>City:</strong> {userInfo?.city}
                  <br />
                  <strong>Country:</strong> {userInfo?.country}
                  <br />
                  <strong>Zip Code:</strong> {userInfo?.zipCode}
              
            </Typography>
            <Link
              href="/dashboard/user-information/address"
              sx={{
                display: "block",
                marginTop: 2,
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Update Address
            </Link>
          </CardContent>
        </Card>
      </Grid>

      {/* Spouse Information */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Spouse Information</Typography>
            <Typography variant="body2" color="text.secondary">
          
               
                  <strong>Name:</strong> {userInfo?.spouseFirstName} {userInfo?.spouseLastName}
                  <br />
                  <strong>SSN:</strong> {userInfo?.spouseSsn}
                
              
            </Typography>
            <Link
              href="/dashboard/user-information/spouse"
              sx={{
                display: "block",
                marginTop: 2,
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Update Spouse Information
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserInfoCard;