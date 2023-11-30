import logo from './ZenNotes.png';
import './App.css';
import {MdClose} from "react-icons/md"
import {useEffect, useState} from "react"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:5500/"

function App() {
  
  useEffect(() => {
    document.title = "ZenNotes"
  },[])

  const [createSection, setCreateSection] = useState(false)
  const [dataList, setDataList] = useState([])
  const [updateSection, setUpdateSection] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })
  const [formDataUpdate, setFormDataUpdate] = useState({
    title: "",
    content: "",
    _id: "",
  })
  
  const handleOnChange = (e) => {
    const {value, name} = e.target
    setFormData((previous) => {
      return {
        ...previous,
        [name]: value,
      }
    })
  }

  const fetchData = async() => {
    const data = await axios.get("/")
    if(data.data.success) { 
      setDataList(data.data.data)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if(data.data.success) {
      setCreateSection(false)
      fetchData()
      alert(data.data.mssg)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  
  const handleUpdate = async(e) => {
    e.preventDefault()
    const data = await axios.put("/update/", formDataUpdate)
    if(data.data.success) {
      fetchData()
      setUpdateSection(false)
      alert(data.data.mssg)
    }
  }

  const update = (el) => {
    setFormDataUpdate(el)
    setUpdateSection(true)
  }

  const handleUpdateOnChange = async(e) => {
    const {value, name} = e.target
    setFormDataUpdate((previous) => {
      return {
        ...previous,
        [name]: value,
      }
    })
  }

  const handleDelete = async(id) => {
    const data = await axios.delete("/delete/" + id)
    if(data.data.success) {
      fetchData()
      alert(data.data.mssg)
    }
  }

  return (
    <>
      <div className='container'>
        <h1 style={{textAlign: "center"}}>ZenNotes</h1>
      </div>
      <div className="container">
        <img src={logo} alt="logo" className="App-logo"/>
      </div>
      <div className="container">
        <button className="btn new-btn" onClick={()=>setCreateSection(true)}>New Note</button>
        {
          createSection && (
            <div className="new-container">
              <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={()=>setCreateSection(false)}><MdClose/></div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" onChange={handleOnChange}/>
                <label htmlFor="content">Content: </label>
                <input type="text" id="content" name="content" onChange={handleOnChange}/>
                <button className="btn">Submit</button>
              </form>
          </div>
          )
        }
        {
          updateSection && (
            <div className="new-container">
              <form onSubmit={handleUpdate}>
                <div className="close-btn" onClick={()=>setUpdateSection(false)}><MdClose/></div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={formDataUpdate.title} name="title" onChange={handleUpdateOnChange}/>
                <label htmlFor="content">Content: </label>
                <input type="text" id="content" value={formDataUpdate.content} name="content" onChange={handleUpdateOnChange}/>
                <button className="btn">Submit</button>
              </form>
          </div>
          )
        }
        <div className="table-container">
          { dataList[0] ? (
              dataList.map((el) => {
                return(
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                            <tr>
                              <td>{el.title}</td>
                              <td>{el.content}</td>
                              <td>
                                <button className='btn update-btn' onClick={()=>update(el)}>Update</button>
                                <button className='btn delete-btn' onClick={()=>handleDelete(el._id)}>Delete</button>
                              </td>
                            </tr>
                      
                    </tbody>
                  </table>
                )  
              })
            )
          : (
            <p className='new-msg'>Please create a new note</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App;
