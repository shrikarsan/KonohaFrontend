import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

import { useLocation } from "react-router-dom";

function SideNav(props) {
  const location = useLocation();
  const navItems = [
    // {
    //   text: "Dashboard",
    //   icon: <DashboardRoundedIcon />,
    //   path: "dashboard",
    // },
    {
      text: "Batches",
      icon: <GroupRoundedIcon />,
      path: "batches",
    },
    {
      text: "Students",
      icon: <GroupRoundedIcon />,
      path: "students",
    },
    {
      text: "Classes",
      icon: <GroupRoundedIcon />,
      path: "classes",
    },
    {
      text: "Attendance",
      icon: <GroupRoundedIcon />,
      path: "attendances",
    },
  ];
  const drawer = (
    <div>
      <Toolbar
        sx={{
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h6" color="#3f50b5">
          Konoha
        </Typography>
      </Toolbar>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            button
            component="a"
            href={"/" + item.path}
          >
            {"/" + item.path === location.pathname ? (
              <ListItemButton sx={{ backgroundColor: "#e9ecef" }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={props.container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideNav;
