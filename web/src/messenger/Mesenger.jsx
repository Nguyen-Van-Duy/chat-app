import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conversation from '../conversation/Conversation';
import './messenger.scss'
import axios from 'axios'
import Message from '../message/Message';

function Mesenger() {
  const navigate = useNavigate()
  const [userConversation, setUserConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState(null)
  const isLogin = useSelector(state=> state.loginSlice.isLogin)
  const userId = useSelector(state=> state.loginSlice.userId)

  console.log(currentChat);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('http://localhost:5000/conversation/' + userId)
      setUserConversation(data.data)
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await axios.get('http://localhost:5000/message/' + currentChat?._id)
        setMessage(data.data)
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [currentChat])

  useEffect(() => {
  if(!isLogin) {
    navigate('/')
  }
  }, [isLogin, navigate])

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log({
      conversationId: currentChat._id,
      sender: userId,
      text: e.target[0].value
    })
    try {
      const data = await axios.post('http://localhost:5000/message', {
        conversationId: currentChat._id,
        sender: userId,
        text: e.target[0].value
      })
      console.log(data)
     alert("thanh cong!")
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='messenger'>
      <div className="chatMenu">
        <div className="chatBoxWrapper">
          {userConversation.length > 0 && userConversation?.map(item => <div key={item._id} onClick={()=> setCurrentChat(item) }>
            <Conversation currentId={userId} item={item} />
          </div>)}
        </div>
      </div>
      <div className="chatBox">
      {currentChat ? <><div className="chatBoxWrapper">
          {message?.map(item=> <div key={item._id}>
            <Message own={item.sender === userId} message={item}/>
          </div>)}
        </div>
        <div className="chatBoxBottom">
          <form onSubmit={handleSendMessage}>
            <textarea name='mesage-send' className='box-chat' />
            <button className="chatSubmitButton" type='submit'>Send</button>
          </form>
        </div></>: <span>Open a conversation to start a chat</span>}
      </div>
      <div className="chatOnline">
        22222222222
      </div>
    </div>
  )
}

export default Mesenger