import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.js';
import ChatWindow from './components/ChatWindow.js';
import ErrorBoundary from './components/ErrorBoundary.js';

function App() {

  // inChat Variable ki value tbhi true hogi jb user "New Chat" ke button pe click krega
  // and jese hi inChat ki value true hogi, hum Chat Window ka component display krr denge user ko
  const [inChat, setInChat] = useState(false);

  const startChat = () => {
    setInChat(true);
  };

  return (
    <div className='App'>
      <ErrorBoundary>
        {
          inChat ? <ChatWindow /> : <Home startChat={startChat} />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;