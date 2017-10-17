import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import { Button, Panel, Col } from 'react-bootstrap';
import store from '../store';

const styles = {
  icons: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    float: 'left'
  },
  icon: {
    padding: '10px'
  }
}

class Chronometer extends Component {
  constructor(props){
    super(props);

    this.toggleChronometer = this.toggleChronometer.bind(this);
    this.zeroPad = this.zeroPad.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.update = this.update.bind(this);
    this.editChronometer = this.editChronometer.bind(this);
    this.deleteChronometer = this.deleteChronometer.bind(this);

    this.state = {
      editChronometer: this.props.editChronometer,
      title: this.props.title,
      description: this.props.description,
      id: this.props.id,
      running: this.props.running,
      minutes: this.props.minutes,
      hours: this.props.hours,
      seconds: this.props.seconds,
      ms: this.props.ms
    }
  }

  render() {
    return (
      <Col sm={12}>
        <Panel>
          <h3>{this.state.title}</h3>
          <p>{this.state.description}</p>
          <h2 className="text-center">{ this.zeroPad(this.state.hours) + ":" + this.zeroPad(this.state.minutes) + ":" + this.zeroPad(this.state.seconds) + ":" + this.zeroPad(this.state.ms) }</h2>
          <div style={styles.icons}>
            <a style={styles.icon} className="glyphicon glyphicon-edit" onClick={ ()=>this.editChronometer(this.state.id) }></a>
            <a className="glyphicon glyphicon-trash" onClick={()=> this.deleteChronometer(this.state.id)}></a>
          </div>
          <p className="text-center"><Button bsStyle={ this.state.running === true ? "danger" : "success" } onClick={ this.toggleChronometer }>{ this.state.running === true ? "Stop" : "Start" }</Button></p>
        </Panel>
      </Col>
    );
  }

  editChronometer(id) {
    this.setState({ editChronometer: true });
    store.dispatch({
      type: "EDIT_CHRONOMETER_FORM",
      ms: this.state.ms,
      seconds: this.state.seconds,
      minutes: this.state.minutes,
      hours: this.state.hours,
      id
    })
  }

  deleteChronometer(id) {
    store.dispatch({
      type: "DELETE_CHRONOMETER",
      id
    })
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

    if (minutes === 60){
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

  zeroPad(value) {
    return value < 10 ? `0${value}` : value;
  }
}

export default Chronometer;
