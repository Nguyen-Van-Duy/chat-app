import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conversation from '../conversation/Conversation';
import './messenger.scss'
import axios from 'axios'
import Message from '../message/Message';

function Mesenger() {
  const [userConversation, setUserConversation] = useState([])
  const navigate = useNavigate()
  const isLogin = useSelector(state=> state.loginSlice.isLogin)

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('http://localhost:5000/account/user')
      setUserConversation(data.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
  if(!isLogin) {
    navigate('/')
  }
  }, [isLogin, navigate])

  return (
    <div className='messenger'>
      <div className="chatMenu">
        <div className="chatBoxWrapper">
          {userConversation.length > 0 && userConversation?.map(item => <Conversation key={item._id} item={item} />)}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <Message />
          <Message own={true}/>
          <Message />
          <Message />
        </div>
      </div>
      <div className="chatOnline">
        22222222222
      </div>
    </div>
  )
}

export default Mesenger