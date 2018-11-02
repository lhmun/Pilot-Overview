import React from 'react';
import InfoFlights from './InfoFlights.jsx';



const Info = (props) => (
  
  <div>
    <h2> User Info</h2>
    <p><b>Name:</b> {props.name}</p>
    <p><b>Email:</b> {props.email}</p>

    {<div>
      <h2> Flight Info </h2>
      <p><b>Total Flights</b>: {props.totalFlights}</p>
      <p><b>Total Flight Time</b>: {props.totalFlightsDuration}</p>
    </div>}
    <InfoFlights />
    List of aircraft types with total flight time per eaceh aircraft type

  </div>
)

export default Info;