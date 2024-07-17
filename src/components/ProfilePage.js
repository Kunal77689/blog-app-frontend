import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Avatar,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    bio: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const userIdResponse = await axios.get(
          `http://localhost:3000/api/users/getUserById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const username = userIdResponse.data.username;

        // Next, get the full user details using the username
        const userResponse = await axios.get(
          `http://localhost:3000/api/users/getUserByUsername/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(userResponse.data);
        setFormData({
          username: userResponse.data.username || "",
          first_name: userResponse.data.first_name || "",
          last_name: userResponse.data.last_name || "",
          bio: userResponse.data.bio || "",
          email: userResponse.data.email || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log(formData);
      await axios.put(
        `http://localhost:3000/api/users/updateUser/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with updated data
      setUserData(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getUsernameInitial = (username) => {
    return username ? username[0].toUpperCase() : "";
  };

  return (
    <div>
      <Navbar />

      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Avatar
              alt="User Avatar"
              src={userData?.avatar || ""}
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            >
              <Typography variant="h3">
                {getUsernameInitial(userData?.username)}
              </Typography>
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {userData?.username || "Username"}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {userData?.bio || "Bio goes here."}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ padding: "40px 0" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>First Name:</strong>
              </Typography>
              {editMode ? (
                <TextField
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <Typography>{userData?.first_name || "First Name"}</Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Last Name:</strong>
              </Typography>
              {editMode ? (
                <TextField
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <Typography>{userData?.last_name || "Last Name"}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Email:</strong>
              </Typography>
              {editMode ? (
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <Typography>{userData?.email || "Email"}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Username:</strong>
              </Typography>
              {editMode ? (
                <TextField
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <Typography>{userData?.username || "Username"}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Bio:</strong>
              </Typography>
              {editMode ? (
                <TextField
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              ) : (
                <Typography>{userData?.bio || "Bio"}</Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={editMode ? handleSave : handleEditToggle}
            >
              {editMode ? "Save Changes" : "Edit Profile"}
            </Button>
          </Box>
        </Container>
      </Box>

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
            © {new Date().getFullYear()} Thoughtful Bytes. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default ProfilePage;
