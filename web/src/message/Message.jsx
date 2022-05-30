import React from 'react'
import './message.scss'
import {format} from 'timeago.js'

export default function Message({own, message}) {
  return (
    
    <div className={own ? 'message own': 'message'}>
        <div className="messageTop">
            {!own && <img 
            className='messageImg'
            src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg" alt="" />}
            <p className="messageText"> {message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
