import React from "react"
import "../App.css"
import { MdClose } from "react-icons/md"

const formTemplate = ({handleSubmit, handleOnChange, handleClose}) => {
    return(
        <div className="new-container">
              <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleClose}><MdClose/></div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" onChange={handleOnChange}/>
                <label htmlFor="content">Content: </label>
                <input type="text" id="content" name="content" onChange={handleOnChange}/>
                <button className="btn">Submit</button>
              </form>
          </div>
    )
}

export default formTemplate