import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { ThumbUp, ChevronLeft, ChevronRight } from "@mui/icons-material";
import Navbar from "./Navbar";
import axios from "axios";

const Categories = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [selectedPostUser, setSelectedPostUser] = useState(null); // State to hold selected post user data

  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // Fetch posts
        const postsResponse = await axios.get(
          "http://3.133.105.39:3000/api/posts/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch liked posts for the user
        const likesResponse = await axios.get(
          `http://3.133.105.39:3000/api/likes/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(postsResponse.data); // Assuming the API response is an array of posts
        setLikedPosts(likesResponse.data.likedPosts); // Assuming the API response is an array of liked post IDs
      } catch (error) {
        console.error("Error fetching posts or likes:", error);
      }
    };

    fetchPostsAndLikes();
  }, []); // Empty dependency array to run only once on mount

  const handleLike = async (postId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      if (likedPosts.includes(postId)) {
        // If the post is already liked, unlike it
        await axios.delete(`http://3.133.105.39:3000/api/likes/delete/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            post_id: postId,
            user_id: userId,
          },
        });
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      } else {
        // If the post is not liked, like it
        await axios.post(
          `http://3.133.105.39:3000/api/likes/create`,
          { post_id: postId, user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPosts([...likedPosts, postId]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleOpen = async (index) => {
    setSelectedPostIndex(index);
    setOpen(true);

    try {
      const userId = posts[index].user_id;
      const token = localStorage.getItem("token");

      // Fetch user details by userId
      const userResponse = await axios.get(
        `http://3.133.105.39:3000/api/users/getUserById/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedPostUser(userResponse.data.username); // Assuming the API response has a 'username' field
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPostIndex(null);
    setSelectedPostUser(null); // Clear selected post user data when dialog is closed
  };

  const handleNextPost = () => {
    setSelectedPostIndex((prevIndex) =>
      prevIndex < posts.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousPost = () => {
    setSelectedPostIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div>
      <Navbar />

      {/* Posts Section */}
      <Box sx={{ backgroundColor: "#fff", padding: "40px 0" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Feed
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {posts.map((post, index) => (
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
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: `url(${post.post_image})`, // Set background image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleOpen(index)}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" color={"#ffffff"}>
                      {post.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: "10px",
                      marginTop: "auto",
                    }}
                  >
                    <Typography variant="body2" color={"#ffffff"}>
                      {post.content.length > 50
                        ? `${post.content.substring(0, 50)}...`
                        : post.content}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        color={
                          likedPosts.includes(post.id) ? "primary" : "default"
                        }
                      >
                        <ThumbUp />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {likedPosts.includes(post.id) ? "Liked" : "Like"}
                        </Typography>
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Dialog for displaying post details */}
      {selectedPostIndex !== null && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url(${posts[selectedPostIndex].post_image})`, // Set background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                borderRadius: "8px 0 0 8px",
                backgroundColor: "#e3f2fd",
              }}
            />

            {/* Content Section */}
            <Box sx={{ flex: 2, padding: "20px" }}>
              <Typography variant="h4" gutterBottom>
                {posts[selectedPostIndex].title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Created by{" "}
                {selectedPostUser
                  ? selectedPostUser
                  : posts[selectedPostIndex].user_id}
              </Typography>
              <Typography variant="body1">
                {posts[selectedPostIndex].content}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "auto",
                }}
              >
                <IconButton
                  onClick={handlePreviousPost}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "transparent", // Remove default hover background
                      boxShadow: "none", // Remove default hover shadow
                    },
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={handleNextPost}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "transparent", // Remove default hover background
                      boxShadow: "none", // Remove default hover shadow
                    },
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}

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
