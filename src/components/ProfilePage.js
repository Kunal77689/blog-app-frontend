import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

        const userResponse = await axios.get(
          `http://localhost:3000/api/users/getUserById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Profile Header */}
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Avatar
            alt="User Avatar"
            src={userData?.avatar || "/default-avatar.png"} // Example default avatar path
            sx={{ width: 120, height: 120, marginBottom: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            {userData?.username || "Username"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {userData?.bio || "Bio goes here."}
          </Typography>
        </Container>
      </Box>

      {/* Additional Profile Information */}
      <Box sx={{ padding: "40px 0" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom>
            Additional Information
          </Typography>
          <Grid container spacing={3}>
            {/* Example additional information */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Email:</strong> {userData?.email || "Email"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Location:</strong> {userData?.location || "Location"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body1">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default ProfilePage;
