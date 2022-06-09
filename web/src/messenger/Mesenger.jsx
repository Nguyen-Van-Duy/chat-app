import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import "./messenger.scss";
import axios from "axios";
import Message from "../message/Message";
import { io } from "socket.io-client";

function Mesenger() {
  const navigate = useNavigate();
  const [userConversation, setUserConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [socket, setSocket] = useState(null)
  const isLogin = useSelector((state) => state.loginSlice.isLogin);
  const userId = useSelector((state) => state.loginSlice.userId);
  const socket = useRef();
  // console.log("conversation: ", currentChat?._id);

  // const [isReceive, setIsReceive] = useState(false);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    // if (isReceive === false) {
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    // }

    // return () => {
    //   setIsReceive(true);
    // };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (userId !== null) {
      socket.current.emit("addUser", userId);
    }
    socket.current.on("getUsers", (users) => {
      console.log("user online: ", users);
    });
  }, [userId]);

  useEffect(() => {
    const getConversation = async () => {
      const data = await axios.get(
        "http://localhost:5000/conversation/" + userId
      );
      setUserConversation(data.data);
    };
    getConversation();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/message/" + currentChat?._id
        );
        setMessage(data.data);
        console.log("total message: ", data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log({
      conversationId: currentChat._id,
      sender: userId,
      text: e.target[0].value,
    });

    const receiverId = currentChat.members.find((member) => member !== userId);
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: e.target[0].value,
    });
    try {
      const data = await axios.post("http://localhost:5000/message", {
        conversationId: currentChat._id,
        sender: userId,
        text: e.target[0].value,
      });
      console.log(data);
      setMessage((d) => [
        ...d,
        {
          conversationId: currentChat._id,
          sender: userId,
          text: e.target[0].value,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatBoxWrapper">
          {userConversation.length > 0 &&
            userConversation?.map((item) => (
              <div key={item._id} onClick={() => setCurrentChat(item)}>
                <Conversation currentId={userId} item={item} />
              </div>
            ))}
        </div>
      </div>
      <div className="chatBox">
        {currentChat ? (
          <>
            <div className="chatBoxWrapper">
              {message?.map((item, id) => (
                <div key={id}>
                  <Message own={item.sender === userId} message={item} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <form onSubmit={handleSendMessage}>
                <textarea name="mesage-send" className="box-chat" />
                <button className="chatSubmitButton" type="submit">
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <span>Open a conversation to start a chat</span>
        )}
      </div>
      <div className="chatOnline"></div>
    </div>
  );
}

export default Mesenger;
