import EventsMap from "./Map"
const MapPage = (props)=>{
    const handleMapChange = props.handleMapChange
    const filteredData = props.filteredData
    const loading = props.loading
    return (<section className="row d-flex justify-content-center" id="map">
    <h3>Happening events</h3>
    <select className="form-select form-select" aria-label=".form-select-lg example" onChange={handleMapChange}>
      <option>Select a type</option>
      <option value="1">Temperature Rise</option>
      <option value="2">Shrinking Ice Sheets</option>
      <option value="3">Sea Level Rise</option>
    </select>
    {loading ? (<span>Loading Data..... Please be patience</span>) : (<EventsMap events={filteredData} />)}
  </section>)
}

export default MapPage