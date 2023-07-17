// wrap whole application in this to use GoogleOAuth services
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";

//components
import Messenger from "./components/Messenger";

function App() {
  const clientId =
    "525933468478-a57mcl9a37rieepbg23r0i2o0fmudm1l.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
