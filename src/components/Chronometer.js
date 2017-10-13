import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import store from '../store';

class Chronometer extends Component {
  constructor(props){
    super(props);

    this.toggleChronometer = this.toggleChronometer.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.update = this.update.bind(this)

    this.state = {
      running: false,
      minutes: 0,
      hours: 0,
      seconds: 0,
      ms: 0
    }
  }

  render() {
    return (
      <Grid>
        <Col md={6}>
          <Jumbotron>
            <h3 className="text-center">Titulo del cronometro</h3>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <h2 className="text-center">{ this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds + ":" + this.state.ms }</h2>
            <p className="text-center"><Button bsStyle="success" onClick={ this.toggleChronometer }>{ this.state.running === true ? "Stop" : "Start" }</Button></p>
          </Jumbotron>
        </Col>
      </Grid>
    );
  }

  toggleChronometer(){
    this.setState({ running: !this.state.running });
    if (this.state.running === false)
      this.handleStart();
    else
      this.handleStop();
  }

  handleStart() {
    this.interval = setInterval(() => {
      this.tick();
    },100 )
  }

  handleStop() {
    clearInterval(this.interval);
  }

  tick(){
    let ms = this.state.ms + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;

    if (ms === 10){
      ms = 0;
      seconds = seconds + 1;
    }

    if (seconds === 60){
      seconds = 0;
      minutes = minutes + 1;
    }

    if (minutes == 60){
      minutes = 0;
      hours = hours + 1;
    }

    if(hours > 99){
      hours = 0;
    }

    this.update(ms, seconds, minutes, hours);
  }

  update(ms, seconds, minutes, hours) {
    this.setState({
        ms: ms,
        seconds: seconds,
        minutes: minutes,
        hours: hours
    });
  }
}

export default Chronometer;
