import React from "react";
import { Typography, Container, Button, Grid, Box } from "@mui/material";
import Categories from "./Categories";
import Marquee from "react-fast-marquee";
import Navbar from "./Navbar";
const HomePage = () => (
  <div>
    <Navbar />
    {/* Hero Section */}
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        color: "#333",
        padding: "80px 0",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Thoughtful Bytes
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Explore creative posts, connect with a community, and more.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "20px" }}
          onClick={() => (window.location.href = "/categories")}
        >
          Get Started
        </Button>
      </Container>
    </Box>

    {/* Featured Projects Section with Marquee */}
    <Box sx={{ backgroundColor: "#fff", padding: "80px 0" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Featured Projects
        </Typography>
        <Marquee
          pauseOnHover={true}
          speed={70}
          gradient={false}
          direction="left"
          marginLeft="10px"
        >
          <Grid container spacing={4} style={{ marginTop: "40px" }}>
            {/* Example Project Cards */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  minHeight: "300px",
                  backgroundColor: "#e3f2fd",
                  padding: "20px",
                  marginBottom: "40px", // Added marginBottom for spacing
                  cursor: "pointer",
                }}
              >
                <Typography variant="h6">Project Title1</Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  minHeight: "300px",
                  backgroundColor: "#f0f4c3",
                  padding: "20px",
                  marginBottom: "40px", // Added marginBottom for spacing
                  cursor: "pointer",
                }}
              >
                <Typography variant="h6">Project Title2</Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  minHeight: "300px",
                  backgroundColor: "#f8bbd0",
                  padding: "20px",
                  marginBottom: "40px", // Added marginBottom for spacing
                  cursor: "pointer",
                  marginRight: "30px",
                }}
              >
                <Typography variant="h6">Project Title3</Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Marquee>
      </Container>
    </Box>

    {/* Testimonials Section */}
    <Box sx={{ backgroundColor: "#f9f9f9", padding: "80px 0" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          What Clients Say
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "40px" }}>
          {/* Example Testimonial Cards */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </Typography>
              <Typography variant="subtitle1">John Doe, CEO</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </Typography>
              <Typography variant="subtitle1">Jane Smith, Designer</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

    {/* Call-to-Action Section */}
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "80px 0",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Join Our Creative Community
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginTop: "20px" }}
        >
          Sign Up Now
        </Button>
      </Container>
    </Box>

    {/* Footer */}
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "40px 0",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" gutterBottom>
          © {new Date().getFullYear()} Thoughtful Bytes. All rights reserved.
        </Typography>
      </Container>
    </Box>
  </div>
);

export default HomePage;
