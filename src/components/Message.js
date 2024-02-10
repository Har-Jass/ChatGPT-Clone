// this Message.js component handles the message that were sent to the ChatGPT API
import React from 'react'

const Message = ({ sender, text }) => {
  // chat krte time jo alignment hoti hai ke user ne jo message bheja wo right side show hoga and jo machine ne reply kiya wo left side me show hoga, for eg., WhatsApp
  const align = sender === 'user' ? 'right' : 'left';

  return (
    <div style={{ textAlign: align }} className={`message ${sender === 'user' ? 'user-message' : 'ai-message'}`}>
        <p className='message-text'>{ text }</p>
        <div className="message-indicator">
          {
            sender === 'user' ? <p className='user-messages'>- You</p> : <p className='gpt-messages'>- ChatGPT</p>
          }
        </div>
    </div>
  )
}

export default Message