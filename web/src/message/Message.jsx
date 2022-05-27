import React from 'react'
import './message.scss'

export default function Message({own}) {
  return (
    
    <div className={own ? 'message own': 'message'}>
        <div className="messageTop">
            {!own && <img 
            className='messageImg'
            src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg" alt="" />}
            <p className="messageText"> Hello this is a message Hello this is a message Hello this is a messageHello this is a messageHello this is a message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}
