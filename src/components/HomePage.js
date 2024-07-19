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
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Marquee from "react-fast-marquee";
import Navbar from "./Navbar";
import axios from "axios";

const HomePage = () => {
  const [topHashtags, setTopHashtags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [usernames, setUsernames] = useState({});
  const [posts, setPosts] = useState([]);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleJoinClick = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowMessage(false);
  };

  useEffect(() => {
    const fetchPostsAndTopHashtags = async () => {
      try {
        const token = localStorage.getItem("token");

        const postsResponse = await axios.get(
          "http://3.133.105.39:3000/api/posts/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedPosts = postsResponse.data;
        setPosts(fetchedPosts);

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

        const sortedHashtags = Object.keys(hashtagsMap).sort(
          (a, b) => hashtagsMap[b] - hashtagsMap[a]
        );

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
          "http://3.133.105.39:3000/api/likes/top-liked-posts",
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
  }, []);

  const handleTagClick = async (tag) => {
    setSelectedTag(tag);
    const filtered = posts.filter((post) => post.content.includes(tag));
    setFilteredPosts(filtered);
    setSelectedPostIndex(0);
    setDialogOpen(true);

    const userIds = filtered.map((post) => post.user_id);
    const token = localStorage.getItem("token");
    const usernamesMap = {};
    await Promise.all(
      userIds.map(async (userId) => {
        try {
          const userResponse = await axios.get(
            `http://3.133.105.39:3000/api/users/getUserById/${userId}`,
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

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTag(null);
    setFilteredPosts([]);
    setSelectedPostIndex(null);
    setUsernames({});
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
                      backgroundImage: `url(${post.post_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
                    onClick={() => (window.location.href = "/categories")}
                  >
                    <Box>
                      <Typography variant="h6" color="white" fontWeight="bold">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {post.content.substring(0, 100)}...
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
            {topHashtags.map((tag, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  <Typography variant="body1">{tag}</Typography>
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
            onClick={handleJoinClick}
          >
            Join
          </Button>
        </Container>
      </Box>

      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        message="Thank you for joining us! Your creativity is appreciated."
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseMessage}
          >
            <IconButton />
          </IconButton>
        }
      >
        <Alert
          onClose={handleCloseMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for joining us! Your creativity is appreciated.
        </Alert>
      </Snackbar>

      {/* Dialog for Posts */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            backgroundImage: filteredPosts[selectedPostIndex]?.post_image
              ? `url(${filteredPosts[selectedPostIndex].post_image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
            color: "white",
            padding: "20px",
          }}
        >
          {selectedTag && filteredPosts.length > 0 ? (
            <>
              {filteredPosts[selectedPostIndex] && (
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {filteredPosts[selectedPostIndex].title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {filteredPosts[selectedPostIndex].content}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Posted by{" "}
                    {usernames[filteredPosts[selectedPostIndex].user_id] ||
                      "Unknown"}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handlePreviousPost}
                  disabled={selectedPostIndex === 0}
                  startIcon={<ChevronLeft />}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextPost}
                  disabled={selectedPostIndex === filteredPosts.length - 1}
                  endIcon={<ChevronRight />}
                >
                  Next
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              No posts available for this hashtag.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
