import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import styled from "@emotion/styled";

//components
import Profile from "./Profile";

const DrawerStyle = {
  left: 20,
  top: 17,
  height: "95%",
  width: "30.5%",
  boxShadow: "none",
};

// instead of {open, setOpen} i.e., object destructuring, we can write (props) and use props.open, props.setOpen
const InfoDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  //
  const Header = styled(Box)`
    display: flex;
    background: #008069;
    height: 107px;
    color: #ffffff;
    & > svg,
    & > p {
      margin-top: auto;
      padding: 15px;
      font-weight: 600;
    }
    ,
    & > p {
      font-size: 18px;
    }
  `;

  const Component = styled(Box)`
    background: #ededed;
    height: 85%;
  `;

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: DrawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <Header>
        <ArrowBack onClick={() => setOpen(false)} />
        <Typography>Profile</Typography>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
