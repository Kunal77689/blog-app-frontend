import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const Categories = ({ onPostSelect }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch categories from the API with Bearer token
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        });
        console.log(response.data);
        setPosts(response.data); // Assuming the API response is an array of categories
      } catch (error) {
        console.error("Error fetching Posts:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      <Navbar />

      {/* Categories Section */}
      <Box sx={{ backgroundColor: "#fff", padding: "40px 0" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Feed
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {posts.map((post) => (
              <Grid key={post.id} item xs={12} md={4}>
                <Box
                  sx={{
                    minHeight: "300px",
                    backgroundColor: "#e3f2fd",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => onPostSelect(post.name)}
                >
                  <Typography variant="h6" align="center">
                    {post.tile}
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    Created by {post.id}
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    {post.content}
                  </Typography>
                </Box>
              </Grid>
            ))}
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
          marginTop: "80px",
        }}
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} Thoughtful Bytes. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Categories;
