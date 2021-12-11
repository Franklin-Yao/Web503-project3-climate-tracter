import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import DeleteList from "./DeleteList";

function Lists(props){
    let listrows = [];
    const event_types = {
        1:"Temperature Rise",
        2: "Shrinking Ice Sheets",
        3: "Sea Level Rise"
    }
    const emergency_level = {
        1: "Level 1, requires immediate actions",
        2: "Level 2, requires actions in 3 years",
        3: "Level 3, requires actions in 5 years",
        4: "Level 3, requires actions in 10 years",
        5: "Level 3, requires actions in 50 years"
    }
    props.alldata.forEach(element => {
        listrows.push(
            <tr key={element._id}>
                <td>{event_types[element.event_type]}</td>
                <td>{emergency_level[element.emergency_level]}</td>
                <td>{element.longitude}</td>
                <td>{element.latitude}</td>
                <td>{element.descriptions}</td>
                <td><img style={{width:50}} src={element.url} alt=""></img></td>
                <td>
                    <DeleteList
                        elementId={element._id}
                        deleteList={props.deleteList}
                    >
                    </DeleteList>
                </td>
            </tr>
        )
    });
    return (
        <div>
            <br></br>
            <h3 className="text-center">My posted events</h3>
            <br></br>
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th>Event Type</th>
                        <th>Emergency Level</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>descriptions</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>{listrows}</tbody>
            </table>
        </div>
    )
}

export default Lists