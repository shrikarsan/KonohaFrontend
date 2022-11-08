import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={props.toggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#3f50b5" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="black"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
