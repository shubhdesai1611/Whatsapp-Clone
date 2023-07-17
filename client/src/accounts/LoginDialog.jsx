// This script is for wp web login page
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";

import { qrCodeImage } from "../constants/data";

// used to give google sign in option
import { GoogleLogin } from "@react-oauth/google";

//Used to decode credentials from google login
import jwt_decode from "jwt-decode";

// importing useContext
import { useContext } from "react";

//import API
import { addUser } from "../service/api";

//
import { AccountContext } from "../context/AccountProvider";

const Component = styled(Box)`
  display: flex;
`;

//padding goes clock-wise top, right, bottom, left
const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

// Here we want to give styling to the QRCode
//As img is not part of mui styled will not recognize it
//so we have to give img as a string as it is an html element
//and we can give styling to as an object in parenthesis and curly bracket
const QRCode = styled("img")({
  height: "264px",
  width: "264px",
  margin: "50px 0 0 50px",
});

//CSS to typography i.e., p tag in html
//It is helpfyl to use typography as we can style it using styled directly
const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

//
const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const dialogStyle = {
  // in object, styling is given in camelCase and without string
  height: "96%", // in object ; is not used
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overFlow: "hidden",
};

//PaperProps:{{sx:}} is used for css
// typography can be used as a replacement of p tag in mui
//List can bs used in replacement of ol, ul and ListItems can be used as a replacement of li
// two box is used to divide it into left and right div, right for QR code
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginError = (res) => {
    console.log("Login failed ", res);
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>To use Whatsapp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open Whatsapp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and click WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="qr code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
