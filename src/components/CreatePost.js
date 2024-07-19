import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Paper,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; // Import an icon for file upload

import axios from "axios";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleJoinClick = () => {
    // Simulate adding email to list
    setShowMessage(true);

    // For real implementation, you would typically make an API call to add the email to a list
    // and handle success or error accordingly.
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowMessage(false);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      let imageUrl = "";
      if (file) {
        const uploadUrlResponse = await axios.post(
          "http://3.133.105.39:3000/api/posts/uploadPostImage",
          {
            filename: file.name,
            filetype: file.type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { url } = uploadUrlResponse.data;

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        imageUrl = url.split("?")[0];
      }

      const newPost = {
        title,
        content,
        post_image: imageUrl,
        user_id: userId,
      };

      await axios.post("http://3.133.105.39:3000/api/posts/create", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTitle("");
      setContent("");
      setFile(null);
      window.location.href = "/categories";
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <input
              accept="image/*"
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <IconButton color="primary" component="span" sx={{ mr: 2 }}>
                <PhotoCamera />
              </IconButton>
              {file ? (
                <Typography variant="body2">{file.name}</Typography>
              ) : (
                <Typography variant="body2">Upload Image</Typography>
              )}
            </label>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isUploading}
              sx={{ position: "relative" }}
            >
              {isUploading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-12px",
                    marginTop: "-12px",
                  }}
                />
              )}
              Create Post
            </Button>
            <Snackbar
              open={showMessage}
              autoHideDuration={4000}
              onClose={handleCloseMessage}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleCloseMessage} severity="success">
                Success! Post created successfully
              </Alert>
            </Snackbar>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
