import React, { Component } from 'react';
import store from '../store';
import Chronometer from './Chronometer';
import ChronometerForm from './ChronometerForm';

class Chronometers extends Component {
  constructor() {
    super();

    this.state = {
      chronometers: []
    }

    store.subscribe(() => {
      this.setState({
        chronometers: store.getState().chronometers
      })
    })
  }

  render() {
    return (
      <div>
        { this.state.chronometers.map((chronometer, index) =>
            chronometer.editChronometer ? <ChronometerForm key={index} edit={true} title={chronometer.title} description={chronometer.description}/> :
            <Chronometer key = {index}
              title = {chronometer.title}
              description = {chronometer.description}
              ms = {chronometer.ms}
              seconds = {chronometer.seconds}
              minutes = {chronometer.minutes}
              hours = {chronometer.hours}
              running = {chronometer.running}
              id = {chronometer.id}
              editChronometer = {chronometer.editChronometer} />
          )}
      </div>
    )
  }
}

export default Chronometers;
