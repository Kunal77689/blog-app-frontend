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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
          ></Typography>
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
        <List style={{ width: 250 }} onClick={toggleDrawer(false)}>
          <ListItem button onClick={() => handleNavigation("/categories")}>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleMenuClose}>
            <ListItemText primary="Categories" />
            {renderCategoriesDropdown()}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
