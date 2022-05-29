import React from 'react'
import './conversation.scss'

export default function Conversation({item}) {
  console.log(item);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg"
        alt=""
      />
      <span className="conversationName">{item.userName}</span>
    </div>
  )
}
