import React, { Component } from 'react';

class Chronometer extends Component {
  constructor(props){
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      hours:0,
      ms:0,
      running: false
    }
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
