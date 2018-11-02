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
      name: '',
      email: '',
      totalFlights: 0,
      totalFlightsDuration: 0,
    }
    this.calculateFlightsDuration.bind(this);
  }

  calculateFlightsDuration(arr) {
    let seconds = arr.map((a) => a.duration).reduce((prev, curr) => prev + curr);
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    let min = Math.floor(((seconds % 86400) % 3600) / 60);

    return days + " days " + hours + " hours " + min + " minutes ";
  }

  componentDidMount() {
    axios.post(
      'http://api.kittyhawk.io/graphql?token=' + token,
      {
        query: `
        query {
          account {
            name,
            owner{
              first_name,
              last_name,
              email
            },
            flights {
              duration
            },
            aircraft {
              manufacturer,
              model,
              flights {
                duration
              }
            }
          }
        }
          `,
      }).then((result) => {
        console.log('results: ', result.data);
        this.setState({ 
          name: result.data.data.account.owner.first_name + ' ' + result.data.data.account.owner.last_name,
          email: result.data.data.account.owner.email,
          totalFlights: result.data.data.account.flights.length,
          totalFlightsDuration: this.calculateFlightsDuration(result.data.data.account.flights)
         });
      });
  }

  render() {
    return (<div>
      <h1>Pilot Overview</h1>
      <Info name={this.state.name} email={this.state.email} totalFlights={this.state.totalFlights} totalFlightsDuration={this.state.totalFlightsDuration} calculateFlightsDuration={this.calculateFlightsDuration} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));