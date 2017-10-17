import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Panel } from 'react-bootstrap';
import store from '../store';

class ChronometerForm extends Component {
  constructor(props) {
    super(props);
    this.createChronometer = this.createChronometer.bind(this);
    this.editChronometer = this.editChronometer.bind(this);
    this.cancelChronometer = this.cancelChronometer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      edit: this.props.edit,
      title: this.props.title,
      description: this.props.description
    }
  }
  render() {
    return (
      <Panel>
        <form onSubmit={this.state.edit ? this.editChronometer : this.createChronometer }>
          <FormGroup controlId="text" validationState={this.getValidationTitle()}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              name = "title"
              type="text"
              value={this.state.title}
              placeholder="Enter text"
              onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup controlId="description" validationState={this.getValidationDescription()}>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              name = "description"
              type="text"
              value={this.state.description}
              placeholder="Enter text"
              onChange={this.handleInputChange}/>
          </FormGroup>
          <Button bsStyle='success' type="submit">{this.state.edit ? 'Edit' : 'Create'}</Button>
          <Button bsStyle='default' onClick={this.cancelChronometer}>Cancel</Button>
        </form>
      </Panel>
    )
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createChronometer(event) {
    event.preventDefault();
    store.dispatch({
      type: "CREATE_CHRONOMETER",
      title: this.state.title,
      description: this.state.description,
    })
  }

  editChronometer(event) {
    event.preventDefault();
    store.dispatch({
      type: "EDIT_CHRONOMETER",
      title: this.state.title,
      description: this.state.description,
    })
  }

  cancelChronometer(id) {
    if (this.state.edit)
      store.dispatch({type: "CANCEL_EDIT_CHRONOMETER", id});
    else
      store.dispatch({type: "CANCEL_NEW_CHRONOMETER"});
  }

  getValidationTitle() {
    if (this.state.title.length > 0) return 'success';
    else if (this.state.title.length === 0) return 'error';
  }

  getValidationDescription() {
    if (this.state.description.length > 0) return 'success';
    else if (this.state.description.length === 0) return 'error';
  }
}

export default ChronometerForm;
