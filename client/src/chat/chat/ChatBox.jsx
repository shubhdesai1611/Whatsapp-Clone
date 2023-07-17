import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Messages from "./Messages";
import { AccountContext } from "../../context/AccountProvider";
import { getConversation } from "../../service/api";

//Component
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
  const [conversation, setConversation] = useState({});
  const { person, account } = useContext(AccountContext);
  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);
    };
    getConversationDetails();
  }, [person.sub]);
  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
