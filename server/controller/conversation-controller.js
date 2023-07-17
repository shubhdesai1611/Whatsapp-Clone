import conversation from "../model/Conversation.js";

export const newConversation = async (request, response) => {
  try {
    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;
    const exist = await conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });
    if (exist) {
      return response.status(200).json("conversation alrady exists");
    }

    const newConversation = new conversation({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    return response.status(200).json("conversation saved successfully");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getConversation = async (request, response) => {
  try {
    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;
    let conv = await conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });
    return response.status(200).json(conv);
  } catch (error) {
    response.status(500).json(error.message);
  }
};
