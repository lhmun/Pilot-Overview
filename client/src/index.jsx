import React from 'react';
import ReactDOM from 'react-dom';
import Info from './components/Info.jsx';
import axios from 'axios';
import API_TOKEN from './../../config.js';

const token = API_TOKEN.API_TOKEN;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['test123']
    }
  }

  componentDidMount() {
    axios.post(
      'http://api.kittyhawk.io/graphql?token=' + token,
      {
        query: `
        query {
          account {
            id,
            owner {
              id, first_name, email
            }
          }
        }
          `,
      }).then((result) => {
        console.log('results: ', result.data);
      });
  }

  render() {
    return (<div>
      <h1>Pilot Overview</h1>
      <Info items={this.state.items} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));