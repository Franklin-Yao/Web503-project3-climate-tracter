import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function EventsMap(props){
    const data = props.events
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

    const mapContainer = <MapContainer id="map-container" minZoom={1.5} center={[33.68, -117]} zoom={1.5} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((event)=>(
            <Marker key={event._id} position={[event.latitude, event.longitude]}>
            <Popup>
                {event.event_type && <p>Event Type: {event_types[event.event_type]}</p>}
                {event.emergency_level && <p>Emergency Level: {emergency_level[event.emergency_level]}</p>}
                {event.longitude && <p>Longitude: {event.longitude}</p>}
                {event.latitude && <p>Latitude: {event.latitude}</p>}
                {event.descriptions && <p>Descriptions: {event.descriptions}</p>}
                {(event.url)?(<img className='img-fluid' alt= '' src={event.url}></img>):(<img className='img-fluid' src='https://climate.nasa.gov/system/internal_resources/details/original/103_shutterstock_88550854-740px.jpg' alt=''></img>)}
            </Popup>
            </Marker>
        ))}
        
    </MapContainer>
    return mapContainer;
    
}

export default EventsMap