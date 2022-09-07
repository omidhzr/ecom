import React from 'react'

// refactor this line so that typescript does not complain about return type

const PageNotFound = () => {
  return (
    <div className="page-not-found" ><h1>404 Page Not Found!</h1>
    <p>Sorry, the page you tried cannot be found</p>
    <a href="/">Go to Home Page</a>
    </div>
  )
}

export default PageNotFound