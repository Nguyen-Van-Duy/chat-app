import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import "./messenger.scss";
import axios from "axios";
import Message from "../message/Message";
import { io } from "socket.io-client";
import Friend from "../friend/Friend";
import Picker from "emoji-picker-react";

const urlConnect = process.env.REACT_APP_CONNECT_SERVER
const urlConnectSocketIO = process.env.REACT_APP_CONNECT_SOCKETIO

function Mesenger() {
  const navigate = useNavigate();
  const [userConversation, setUserConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [addNewFriend, setAddNewFriend] = useState(false);
  // const [socket, setSocket] = useState(null)
  const isLogin = useSelector((state) => state.loginSlice.isLogin);
  const userId = useSelector((state) => state.loginSlice.userId);
  const socket = useRef();
  const scrollRef = useRef();
  // console.log("conversation: ", currentChat?._id);
  // console.log("id", process.env.REACT_APP_CONNECT_SERVER);

  const [isReceive, setIsReceive] = useState(false);
  const [isAddFriend, setIsAddFriend] = useState(false);

  const token = localStorage.getItem('token')
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  

  useEffect(() => {
    socket.current = io(urlConnectSocketIO);
    if (isReceive === false) {
      socket.current.on("getMessage", (data) => {
        console.log('1111111');
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }

    return () => {
      console.log('2222');
      setIsReceive(true);
    };
  }, [isReceive]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (userId !== null) {
      socket.current.emit("addUser", userId);
    }
    if(isAddFriend === false) {
      socket.current.on("getUsers", (users) => {
        console.log("user online: ", users);
      });
    }
    return () => {
      setIsAddFriend(true);
    };

  }, [userId, isAddFriend]);

  useEffect(() => {
    const getConversation = async () => {
      const data = await axios.get(
        urlConnect + "conversation/" + userId
      );
      setUserConversation(data.data);
    };
    getConversation();
  }, [userId, addNewFriend]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await axios.get(
          urlConnect + "message/" + currentChat?._id
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
      // text: e.target[0].value,
      text: inputStr,
    });

    const receiverId = currentChat.members.find((member) => member !== userId);
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      // text: e.target[0].value,
      text: inputStr,
    });
    try {
      const data = await axios.post( urlConnect + "message", {
        conversationId: currentChat._id,
        sender: userId,
        // text: e.target[0].value,
        text: inputStr,
      });
      console.log(data);
      setMessage((d) => [
        ...d,
        {
          conversationId: currentChat._id,
          sender: userId,
          // text: e.target[0].value,
          text: inputStr,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(scrollRef.current);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const addFriend = async (receiverId) => {
    const result = await axios.post(urlConnect + 'conversation/add-friend',{receiverId, senderId: userId }, { headers: {"Authorization" : `Bearer ${token}`} })
    console.log(result);
    if(result.status === 200) {
      setAddNewFriend(!addNewFriend)
      alert("Success")
    }
  }

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
                <div key={id} ref={scrollRef}>
                  <Message own={item.sender === userId} message={item} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <form onSubmit={handleSendMessage}>
                <textarea name="mesage-send" className="box-chat" value={inputStr} onChange={(e) => setInputStr(e.target.value)} />
                <img
                  className="emoji-icon" alt=""
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                  onClick={() => setShowPicker((val) => !val)}
                />
                
                  {showPicker && <div>
                    <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '70%' }} />
                  </div>}
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
      <div className="chatOnline">
        {userId && <Friend currentId={userId} addFriend={addFriend} />}
      </div>
    </div>
  );
}

export default Mesenger;
