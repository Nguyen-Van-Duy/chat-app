import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversation.scss'


export default function Conversation({item, currentId}) {

  const [user, setUser] = useState(null)

  useEffect(()=> {
    const friendId = item.members.find(f=> f !== currentId)
    const getUser = async () => {
      const data = await axios.get(process.env.REACT_APP_CONNECT_SERVER + 'account/user/' + friendId)
      setUser(data.data)
    }
    getUser()
  }, [currentId, item.members])
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg"
        alt=""
      />
      <span className="conversationName">{user?.userName}</span>
    </div>
  )
}
