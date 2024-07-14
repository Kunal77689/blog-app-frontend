import React, { useState } from "react";
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

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/createUser",
        {
          username,
          email,
          password,
          first_name: firstname,
          last_name: lastname,
          profile_picture: "None",
          bio,
        }
      );
      console.log("Signup successful", response.data);
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
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
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
                Signup
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
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  value={firstname}
                  onChange={handleFirstnameChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  value={lastname}
                  onChange={handleLastnameChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="bio"
                  label="Bio"
                  name="bio"
                  autoComplete="bio"
                  value={bio}
                  onChange={handleBioChange}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Signup
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="primary">
                  <a
                    href="/login"
                    style={{
                      textDecoration: "underline",
                      color: "#1976d2",
                      paddingRight: "8px",
                    }}
                  >
                    Already have an account? Login
                  </a>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
