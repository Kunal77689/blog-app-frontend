import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight, AccountCircle } from "@mui/icons-material";
import Marquee from "react-fast-marquee"; // Import Marquee component
import Navbar from "./Navbar";
import axios from "axios";

const HomePage = () => {
  const [topHashtags, setTopHashtags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [usernames, setUsernames] = useState({}); // State to hold usernames
  const [posts, setPosts] = useState([]);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPostsAndTopHashtags = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch posts
        const postsResponse = await axios.get(
          "http://localhost:3000/api/posts/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedPosts = postsResponse.data; // Store fetched posts
        setPosts(fetchedPosts); // Update posts state

        // Extract hashtags from each post's content
        const hashtagsMap = {};
        fetchedPosts.forEach((post) => {
          const content = post.content;
          const regex = /#[^\s#]+/g;
          const hashtags = content.match(regex);
          if (hashtags) {
            hashtags.forEach((tag) => {
              if (hashtagsMap[tag]) {
                hashtagsMap[tag]++;
              } else {
                hashtagsMap[tag] = 1;
              }
            });
          }
        });

        // Sort hashtags by frequency in descending order
        const sortedHashtags = Object.keys(hashtagsMap).sort(
          (a, b) => hashtagsMap[b] - hashtagsMap[a]
        );

        // Get top 4 hashtags
        const top4Hashtags = sortedHashtags.slice(0, 4);
        setTopHashtags(top4Hashtags);
      } catch (error) {
        console.error("Error fetching posts or extracting hashtags:", error);
      }
    };

    const fetchTopLikedPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/likes/top-liked-posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopLikedPosts(response.data);
      } catch (error) {
        console.error("Error fetching top liked posts:", error);
      }
    };

    fetchPostsAndTopHashtags();
    fetchTopLikedPosts();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // Function to filter posts by hashtag and display in a dialog
  const handleTagClick = async (tag) => {
    setSelectedTag(tag);
    const filtered = posts.filter((post) => post.content.includes(tag));
    setFilteredPosts(filtered);
    setSelectedPostIndex(0); // Display first post by default
    setDialogOpen(true);

    // Fetch usernames for filtered posts
    const userIds = filtered.map((post) => post.user_id);
    const token = localStorage.getItem("token");
    const usernamesMap = {};
    await Promise.all(
      userIds.map(async (userId) => {
        try {
          const userResponse = await axios.get(
            `http://localhost:3000/api/users/getUserById/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          usernamesMap[userId] = userResponse.data.username;
        } catch (error) {
          console.error(
            `Error fetching username for user ID ${userId}:`,
            error
          );
          usernamesMap[userId] = "Unknown";
        }
      })
    );

    setUsernames(usernamesMap);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTag(null);
    setFilteredPosts([]);
    setSelectedPostIndex(null);
    setUsernames({}); // Clear usernames state
  };

  const handlePreviousPost = () => {
    if (selectedPostIndex > 0) {
      setSelectedPostIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextPost = () => {
    if (selectedPostIndex < filteredPosts.length - 1) {
      setSelectedPostIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Filter posts to include only top liked posts
  const filteredTopLikedPosts = posts.filter((post) =>
    topLikedPosts.some((topPost) => topPost.post_id === post.id)
  );

  return (
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
            Top Liked Posts
          </Typography>
          <Marquee
            pauseOnHover={true}
            speed={70}
            gradient={false}
            direction="left"
            marginLeft="10px"
          >
            <Grid
              container
              spacing={4}
              style={{
                marginTop: "40px",
                display: "flex",
                flexWrap: "nowrap",
                marginRight: "35px",
              }}
            >
              {filteredTopLikedPosts.map((post) => (
                <Grid
                  item
                  key={post.id}
                  style={{ flex: "0 0 auto", width: "500px" }}
                >
                  <Box
                    sx={{
                      minHeight: "300px",
                      backgroundColor: "#e3f2fd",
                      padding: "20px",
                      borderRadius: "20px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{post.title}</Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body1">{post.content}</Typography>
                      <Typography variant="body2">
                        {new Date(post.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Marquee>
        </Container>
      </Box>

      {/* Top Hashtags Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", padding: "80px 0" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Top Hashtags
          </Typography>
          <Grid container spacing={4} style={{ marginTop: "40px" }}>
            {/* Display top hashtags dynamically */}
            {topHashtags.map((tag, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  <Typography variant="body1">{tag}</Typography>
                  {/* Example subtitle */}
                </Box>
              </Grid>
            ))}
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

      {/* Dialog for Filtered Posts */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ display: "flex" }}>
          {/* Left side with arrows */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#e3f2fd",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Replace with image or solid background */}
            <Typography variant="h6">Image or Placeholder</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "auto",
                height: "400px",
              }}
            >
              <IconButton
                onClick={handlePreviousPost}
                disabled={selectedPostIndex === 0}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNextPost}
                disabled={selectedPostIndex === filteredPosts.length - 1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
          {/* Right side with post details */}
          <Box sx={{ flex: 2, padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {filteredPosts[selectedPostIndex]?.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created by{" "}
              {usernames[filteredPosts[selectedPostIndex]?.user_id] ||
                "Unknown"}
            </Typography>
            <Typography variant="body1">
              {filteredPosts[selectedPostIndex]?.content}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
