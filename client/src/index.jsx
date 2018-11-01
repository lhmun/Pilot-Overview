import React from 'react';
import ReactDOM from 'react-dom';
import Info from './components/Info.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: ['test123']
    }
  }

  componentDidMount() {
    console.log('Loaded');
  }

  render () {
    return (<div>
      <h1>Pilot Overview</h1>
      <Info items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));