import React from 'react';

const Report = (props) => (
  <div>
    <h2> Report</h2>
    <textarea value={props.csv} rows="4" cols="50"></textarea>
  </div>
)

export default Report;