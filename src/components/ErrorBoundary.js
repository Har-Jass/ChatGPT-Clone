// this ErrorBoundary.js component will give us the clear error message
import React from 'react'

// this is not functional component, this is a class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  // this lifecycle method is called when an error is thrown in a child component
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  // this lifecycle method is called when an error is thrown in a child component
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if(this.state.hasError) {
      return <h2 className='error-message'>Something went wrong!</h2>
    }

    return this.props.children
  }
}

export default ErrorBoundary