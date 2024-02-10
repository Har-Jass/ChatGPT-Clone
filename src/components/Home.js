import React from 'react'
import { PiChatTeardropDots } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

// startChat is a prop passed from App.js
const Home = ({ startChat }) => {
  return (
    <div className='home-page'>
      <div className='headline'>
        <PiChatTeardropDots className='chat-icon'/>
        <h2>ChatGPT Clone</h2>
      </div>
      <h3>Welcome, How can I help you today?</h3>
      <div className='down-link'>
        <p>Click the button to get started!</p>
        <IoIosArrowDown className='down-icon' />
      </div>
      <button onClick={startChat}>New Chat</button>
    </div>
  )
}

export default Home