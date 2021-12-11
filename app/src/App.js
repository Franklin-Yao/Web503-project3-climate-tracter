import React, { useState, useEffect } from "react";
import "./App.css";
import FacebookLogin from "react-facebook-login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Modal, Button } from "react-bootstrap";
import CreatList from "./CreatList";
import Lists from "./Lists";
import MapPage from "./MapPage";

import {
  Link,BrowserRouter as Router,Routes,Route
} from 'react-router-dom';

function App(props) {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [fbpic, setPicture] = useState('')
  const [userid, setUserId] = useState('')
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [alldata, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [singledata, setSingleData] = useState({
    userid: "",
    event_type: "Select",
    emergency_level: "Select",
    longitude: 0,
    latitude: 0,
    descriptions: ""
  });

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);
  const handleChange = (e) => {
    let event_type = singledata.event_type;
    let emergency_level = singledata.emergency_level;
    let longitude = singledata.longitude
    let latitude = singledata.latitude
    let descriptions = singledata.descriptions
    let url = singledata.url
    switch (e.target.name) {
      case "event_type":
        event_type = e.target.value
        break
      case "emergency_level":
        emergency_level = e.target.value
        break
      case "longitude":
        longitude = e.target.value
        break
      case "latitude":
        latitude = e.target.value
        break
      default:
        descriptions = e.target.value
    }
    setSingleData(
      {...singledata,
        event_type: event_type,
        emergency_level: emergency_level,
        longitude: longitude,
        latitude: latitude,
        descriptions: descriptions,
        url:url
      })
  }

  const handleMapChange = (e) => {
    const event_type = e.target.value
    setFilteredData(alldata.filter(event => event.event_type === parseInt(event_type)))
  }

  const uploaderOnChange = (e) => {
    setImage(e.target.files[0])
    
  }

  const uploadImage = ()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "tutorial")
    data.append("cloud_name", "breellz")
    fetch("https://api.cloudinary.com/v1_1/breellz/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
        setSingleData({
          ...singledata, url:data.url
        })
      })
      .catch(err => {
        alert("Image upload failed, you retry or give up loading an image")
        console.log(err)
      })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setSingleData({...singledata, userid:response.id})
      getMyLists(response.id);
      setUserId(response.id)
      setLogin(true)
    } else {
      setLogin(false)
    }
    handleClose()
  }

  const logout = () => {
    console.log(window.FB);
    window.FB.logout()
    setLogin(false)
  }

  const report = () => {
    if (!login) {
      handleShow()
    } else {
      handleAddShow()
    }
  }

  const createList = () => {
    console.log(singledata)
    fetch("/api/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singledata)
    }).then(() => {
      setToastShow(true)
      setTimeout(() => setToastShow(false), 2000);
      setSingleData({
          ...singledata,
          event_type: "Select",
          emergency_level: "Select",
          longitude: 0,
          latitude: 0,
          descriptions: "",
          url:""
        });
      getLists();
      getMyLists(userid);
    });
  }

  const getLists = () => {
    fetch("/api/events").then(res => res.json())
      .then(
        result => {
          setAllData(result)
          setFilteredData(result)
          setLoading(false)
        })
      .catch(console.log);
  }

  const getMyLists = (id) => {
    fetch("/api/events/"+id).then(res => res.json())
      .then(
        result => {
          setLoading(false)
          setMyData(result)
        })
      .catch(console.log);
  }

  const deleteList = (event, id)=>{
    fetch("/api/event/"+id, {
      method: "DELETE"
    }).then(res=>res.json())
    .then(result=>{
      setSingleData({
        ...singledata,
        event_type: "Select",
        emergency_level: "Select",
        longitude: 0,
        latitude: 0,
        descriptions: "",
        url:""
      });
      getLists();
      getMyLists(userid);
  });
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <Router>
    <div className="container-fluid">
      <header className="px-4 row py-3">
        <Link to="/" className="col-6 w-25"><img src="/logo.png" alt="" /></Link>
        <span className="col-6 w-75 d-flex justify-content-end">
          {login &&
            <div>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="secondary" className="bg-white" id="dropdown-basic">
                  {data.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><Link to="/myevents">Manage my events</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <img className="rounded-circle" src={fbpic} alt={data.name} />
            </div>
          }
          {!login && <FacebookLogin cssClass="btn btn-primary bg-white" appId="596762551567730" autoLoad={false} fields="name, email, picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook" />}
        </span>
      </header>

      <div id="banner" className="row">
        <div className="content">
          <h3>Climate is changing faster than ever!</h3>
          <p>To report climate change events, please sign in first</p>
          <button className="btn btn-dark" onClick={report}>Report an Event</button>
          <CreatList
            addShow={addShow}
            handleAddClose={handleAddClose}
            uploaderOnChange={uploaderOnChange}
            uploadImage = {uploadImage}
            url={url}
            singledata={singledata}
            handleChange={handleChange}
            createList={createList}
          />
        </div>
        <Modal className="custom-dialog" show={toastShow}>
          <Modal.Body closeButton><strong>Thanks for making a great contribution! You are a great citizen on earth!</strong></Modal.Body>
        </Modal>
        <Modal show={show} onHide={handleClose} className="custom-dialog">
          <Modal.Body>Please login first</Modal.Body>
          <Modal.Footer>
            {!login && <FacebookLogin cssClass="btn btn-primary bg-white" appId="596762551567730" autoLoad={false} fields="name, email, picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Routes>
        <Route path="/" element={<MapPage handleMapChange={handleMapChange} filteredData={filteredData} loading={loading}/>}/>
        <Route path="/myevents" element={!loading &&login && <Lists 
          alldata={myData}
          singledata={singledata}
          deleteList = {deleteList}
          handleChange = {handleChange}
        />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;