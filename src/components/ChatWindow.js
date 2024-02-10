// this ChatWindow.js component handles the conversation between the ChatGTP and the User
import React, { useState, useEffect } from 'react'
import Message from './Message.js';
import LoadingIndicator from './LoadingIndicator.js'
import axios from 'axios';
import { FaArrowUpLong } from "react-icons/fa6";
import { PiChatTeardropDots } from "react-icons/pi";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // load messages from local storage
  const loadFromLocalStorage = () => {
    const chatHistory = localStorage.getItem('chatHistory');
    if(chatHistory) {
      return JSON.parse(chatHistory);
    }
    else {
      return [];
    }
  }

  // save messages to local storage
  const saveToLocalStorage = (chatHistory) => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }

  // load chat history when the component mounts
  useEffect(() => {
    const chatHistory = loadFromLocalStorage();
    setMessages(chatHistory);
  }, [])

  // load any saved messages from local storage
  useEffect(() => {
    const savedMessages = loadFromLocalStorage();
    if(savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  const sendMessage = async(userInput) => {
    // add user message to state
    const userMessage = { sender: 'user', text: userInput };
    setMessages([...messages, userMessage]);

    saveToLocalStorage([...messages, userMessage]);

    console.log("User Message -> ", userMessage);

    // set loading to true
    setLoading(true);

    // data for the API call
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: userInput }],
    };

    // headers for API calls
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY
    };

    try {
      console.log("Doing AXIOS Call");

      // send the user message to the API
      const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });

      console.log("Response -> ", response);

      // add the API response to state
      const aiMessage = {
        sender: 'ai',
        text: response.data.choices[0].message.content.trim()
      };

      setMessages([...messages, userMessage, aiMessage]);

      saveToLocalStorage([...messages, userMessage, aiMessage]);
    }
    catch(error) {
      console.log(error);
    }

    // set loading to false
    setLoading(false);
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); // prevents page refresh

    if(input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className='main-div'>
      <div className='chat-window-text'>
        <PiChatTeardropDots />
        ChatGPT 3.5
      </div>
      <div className='main-chat-section'>
        <div className='chat-window'>
          {/* display all messages */}
          {
            messages.map((message, index) => (
              <Message 
                key={index} 
                sender={message.sender}
                text={message.text} 
              />
            ))
          }

          {/* display loading indicator */}
          {
            loading && <LoadingIndicator />
          }
        </div>

        {/* display input */}
        <form onSubmit={ handleSubmit } className='chat-form'>
          <input
            className='input-class'
            type='text'
            value={input}
            onChange={handleInput}
            placeholder='Message ChatGPT...'
          />
          <button type='submit' className='send-button'>
            <FaArrowUpLong className='up-icon'/>
          </button>
        </form>

        <p className='chat-window-warning'>
          *ChatGPT can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow