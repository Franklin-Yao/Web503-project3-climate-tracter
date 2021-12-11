import React, {useState} from "react";
import {Modal, Button,Form} from "react-bootstrap"
import {CloudinaryContext, Image} from "cloudinary-react"
import ImageUploader from "./uploadImage";

function CreatList(props){
    const {addShow, handleAddClose,uploaderOnChange, url, singledata, handleChange,createList} = props
    const [validated, setValidated] = useState(false);
    const handleSubmit = (e)=>{
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            handleAddClose();
            createList();
        }
        e.preventDefault();
        e.stopPropagation();
        setValidated(true)
    }
    return (
        <React.Fragment>
            <Modal show={addShow} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report an event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Event Type</Form.Label>
                            <Form.Select required name="event_type" aria-label="Default select example" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="1">Temperature Rise</option>
                                <option value="2">Shrinking Ice Sheets</option>
                                <option value="3">Sea Level Rise</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select an event type.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={handleChange}>
                            <Form.Label>Emergency Level</Form.Label>
                            <Form.Select required name="emergency_level" aria-label="Default select example">
                                <option value="">Select</option>
                                <option value="1">Level 1, Requires immediate actions</option>
                                <option value="2">Level 2, Requires actions in 3 years</option>
                                <option value="3">Level 3, Requires actions in 5 years</option>
                                <option value="3">Level 4, Requires actions in 10 years</option>
                                <option value="3">Level 5, Requires actions in 50 years</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select an emergency type.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control required type="text" placeholder="-180 ~ 180" name="longitude" value={singledata.title} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please input a longitude.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control required type="text" placeholder="-90 ~ 90" name="latitude" value={singledata.title} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please input a latitude.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descriptions</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Describe what is happening..." name="descriptions" value={singledata.title} onChange={handleChange}/>
                        </Form.Group>
                        <ImageUploader uploaderOnChange={uploaderOnChange} url={url}/>
                        <div className="d-flex justify-content-end">
                            <Button className="mr-5" variant="success" type="submit">Submit</Button>
                            <Button className="ml-5" variant="secondary" onClick={handleAddClose}>Cancel</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default CreatList