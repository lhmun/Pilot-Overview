import React from 'react';
import InfoItem from './InfoItem.jsx';

const Info = (props) => (
  <div>
    <h4> Info Component </h4>
    { props.items.map(item => <InfoItem item={item}/>)}
  </div>
)

export default Info;