import React, { Component } from 'react';
import './App.css';
import NewChronometer from './components/NewChronometer';
import { Grid, Col } from 'react-bootstrap';
import Chronometers from './components/Chronometers';

class App extends Component {
  render() {
    return (
      <Grid>
        <Col smOffset={4} sm={4}>
          <div className="App">
            <h1 className="text-center">Cronometros</h1>
            <Chronometers />
            <NewChronometer />
          </div>
        </Col>
      </Grid>
    );
  }
}

export default App;
