import { Component } from 'react'
class ErrorPage extends Component {
  render() {
    return (
      <div id="error-page" className="load">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>error</i>
        </p>
      </div>
    )
  }
}

export default ErrorPage
