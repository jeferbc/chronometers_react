import React, { Component } from 'react';
import ChronometerForm from './ChronometerForm';
import { Button, Col } from 'react-bootstrap';
import store from '../store';

class NewChronometer extends Component {
  constructor() {
    super();
    this.formChronometer = this.formChronometer.bind(this);

    this.state = {
      newForm: false
    }

    store.subscribe(() => {
      this.setState({
        newForm: store.getState().newChronometer
      });
    });
  }
  render() {
    let newButton = <p className="text-center"><Button className="glyphicon glyphicon-plus" onClick={this.formChronometer}></Button></p>
    return (
      <Col sm={12}>
        {this.state.newForm ? <ChronometerForm edit={false} title={""} description={""}/> : newButton}
      </Col>
    )
  }

  formChronometer(){
    store.dispatch({
      type: "NEW_CHRONOMETER_FORM"
    })
  }
}

export default NewChronometer;
