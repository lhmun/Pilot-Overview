import React from 'react';

const InfoAircraft = (props) => (
  <tr>
    <td>{props.aircraft.manufacturer}</td>
    <td>{props.aircraft.model}</td>
    <td>{props.calculateFlightsDuration(props.aircraft.flights)}</td>
  </tr>
)

export default InfoAircraft;