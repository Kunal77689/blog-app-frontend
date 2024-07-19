import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddIcon from "@mui/icons-material/PostAdd"; // Import a suitable icon for creating posts

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // Navigate to profile page
    window.location.href = "/profile"; // Replace with your profile page path
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const categories = Array.from(
    { length: 10 },
    (_, index) => `Option ${index + 1}`
  );

  const handleNavigation = (path) => {
    window.location.href = path;
    handleMenuClose(); // Close the menu after navigation
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Navigate to login screen
    window.location.href = "/login";
  };

  const renderCategoriesDropdown = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {categories.map((category, index) => (
        <MenuItem key={index} onClick={() => handleNavigation(`/${category}`)}>
          {category}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f0f0f0" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="#404040"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ textDecoration: "none", flexGrow: 1, cursor: "pointer" }}
            onClick={() => handleNavigation("/")}
          >
            {/* Replace with site title or logo */}
          </Typography>
          <IconButton
            color="#404040"
            aria-label="create post"
            edge="end"
            onClick={() => handleNavigation("/createpost")}
          >
            <PostAddIcon /> {/* Add an icon to represent creating a post */}
          </IconButton>
          <IconButton
            color="#404040"
            aria-label="profile"
            edge="end"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        sx={{ backgroundColor: "#f0f0f0" }}
      >
        <Box
          style={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List onClick={toggleDrawer(false)}>
            <ListItem button onClick={() => handleNavigation("/createpost")}>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/categories")}>
              <ListItemText primary="Posts" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/")}>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ padding: "10px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
