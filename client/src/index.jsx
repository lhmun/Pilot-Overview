import React from 'react';
import ReactDOM from 'react-dom';
import Info from './components/Info.jsx';
import Report from './components/Report.jsx';
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
      aircraft: [],
      report: {},
      csv: ''
    }
    this.calculateFlightsDuration.bind(this);
  }

  calculateFlightsDuration(arr) {
    if (arr.length === 0) {
      return '0 days 0 hours 0 minutes';
    }

    let seconds = arr.map((a) => a.duration).reduce((prev, curr) => prev + curr);
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    let min = Math.floor(((seconds % 86400) % 3600) / 60);

    return days + " days " + hours + " hours " + min + " minutes ";
  }

  convertToCSV(objArray) {
    var items = [objArray];
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(items[0]);
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');
    return csv;
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
        this.setState({
          name: result.data.data.account.owner.first_name + ' ' + result.data.data.account.owner.last_name,
          email: result.data.data.account.owner.email,
          totalFlights: result.data.data.account.flights.length,
          totalFlightsDuration: this.calculateFlightsDuration(result.data.data.account.flights),
          aircraft: result.data.data.account.aircraft,
        });
      });

    axios.post(
      'http://api.kittyhawk.io/graphql?token=' + token,
      {
        query: `
          query {
            account {
              flights {
                id,latitude,longitude,duration,notes,pilot {
                  id
                },location {
                  id
                }
              },
              aircraft {
                id,name,manufacturer,model,serial_number
              },
              batteries{
                id,name,manufacturer,serial_number,flights {
                  id
                }
              },
              locations{
                id,name,latitude,longitude,notes
              }
            }
          }
            `,
      }).then((result) => {
        this.setState({
          report: result.data.data.account
        });
        this.setState({csv: this.convertToCSV(result.data.data.account)});
      });
  }

  render() {
    return (<div>
      <h1>Pilot Overview</h1>
      <Info aircraft={this.state.aircraft} calculateFlightsDuration={this.calculateFlightsDuration} name={this.state.name} email={this.state.email} totalFlights={this.state.totalFlights} totalFlightsDuration={this.state.totalFlightsDuration} />
      <Report csv={this.state.csv}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));