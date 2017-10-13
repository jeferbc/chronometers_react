import React, { Component } from 'react';
import ReactInterval from 'react-interval';
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
      <div className="Chronometer">
        <h3>Titulo del cronometro</h3>
        <p>Descripcion del cronometro</p>
        <p>{ "Running = " + this.state.running }</p>
        <h2>{ this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds + ":" + this.state.ms }</h2>
        <button type="button" href="#" onClick={ this.toggleChronometer }>{ this.state.running === true ? "Stop" : "Start" }</button>
      </div>
    );
  }

  toggleChronometer(){
    this.setState({ running: !this.state.running });
    console.log(this.state.running)
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
