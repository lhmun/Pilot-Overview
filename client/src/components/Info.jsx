import React from 'react';
import InfoAircraft from './InfoAircraft.jsx';



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
    <table>
      <tbody>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Duration</th>
        </tr>
        {props.aircraft.map((item, index) => <InfoAircraft calculateFlightsDuration={props.calculateFlightsDuration} aircraft={item} idx={index} key={index} />)}
      </tbody>
    </table>
  </div>
)

export default Info;