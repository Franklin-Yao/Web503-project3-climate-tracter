import React from "react";
import {Button} from "react-bootstrap"

function DeleteList(props){
    return (
        <React.Fragment>
            <Button variant="warning" onClick={(evt)=>{
                        // handleShow();
                        props.deleteList(evt, props.elementId)
                    }}>
                Delete
            </Button>
        </React.Fragment>
    )
}

export default DeleteList