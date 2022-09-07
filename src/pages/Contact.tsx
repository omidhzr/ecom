import React from 'react'

export const Contact = () => {
  return (
    //add a div with a class of container
    <div className="container">
      <h1>Contact us</h1>
      <div className="contact-form">
        <form className="contact-us">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" placeholder="Enter your name" />
            <label className="form-label">Email</label>
            <input className="form-control" type="email" placeholder="Enter your email" />
            <label className="form-label">Message</label>
            <textarea className="form-control" placeholder="Enter your message" />
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>

  )
}