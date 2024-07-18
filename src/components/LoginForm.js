import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Fade,
} from "@mui/material";
import ParticlesBg from "particles-bg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Perform login
      const response = await axios.post(
        "http://3.133.105.39:3000/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Login successful", response.data);

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Fetch the user ID
      const userIdResponse = await axios.get(
        `http://3.133.105.39:3000/api/users/getUserId/${email}`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );

      const userId = userIdResponse.data.user.id;
      console.log("User ID:", userId);

      // Store the user ID in localStorage
      localStorage.setItem("userId", userId);

      // Redirect to the homepage
      window.location.href = "/";
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />
      <Container maxWidth="xs" sx={{ position: "relative", height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                boxShadow: 4,
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                color="textSecondary"
                gutterBottom
              >
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="primary">
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "underline",
                      color: "#1976d2",
                    }}
                  >
                    Create a new account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
