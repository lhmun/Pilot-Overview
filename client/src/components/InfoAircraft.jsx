import React from 'react';

const InfoAircraft = (props) => (
  <tr>
    <td>{props.aircraft.manufacturer}</td>
    <td>{props.aircraft.model}</td>
    <td>{}</td>
  </tr>
)

export default InfoAircraft;