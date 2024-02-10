// this LoadingIndicator.js component shows the loading to the user whenever we sends our message to ChatGPT, that time user will see the loading part
import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className='loading-indicator'>
      <div className='loading-indicator-spinner'></div>
    </div>
  )
}

export default LoadingIndicator