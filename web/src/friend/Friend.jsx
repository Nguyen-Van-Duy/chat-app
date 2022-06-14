import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../conversation/conversation.scss'
import "./Friend.scss";


export default function Friend({currentId, addFriend}) {

  const [user, setUser] = useState(null)

  useEffect(()=> {
   
    const getUser = async () => {
      const data = await axios.get(process.env.REACT_APP_CONNECT_SERVER + 'account/user')
      const friend = data.data.filter(user=> user._id !== currentId)
      setUser(friend)
    }
    getUser()
  }, [currentId])
  return (
    <>
    {user?.map((item, index)=><div className="conversation conversation-friend" key={index}>
      <img
        className="conversationImg"
        src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg"
        alt=""
      />
      <span className="conversationName">{item.userName}</span>
      <ul className='friend__list'>
        <li className="friend__item">Xem</li>
        <li className="friend__item" onClick={()=>addFriend(item._id)}>Thêm bạn bè</li>
      </ul>
    </div>)}
    </>
  )
}
