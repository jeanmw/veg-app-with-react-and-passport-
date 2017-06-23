import React, { Component } from 'react';
import Vegetable from './Vegetable';
import $ from 'jquery-ajax';
import { Button, Card, Row, Col } from 'react-materialize';

class VegetableList extends Component {
  constructor(props) {
    super(props);
    this.state={newVegName: '', newVegDescription:''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    let name = this.state.newVegName;
    let description = this.state.newVegDescription;
    let user = this.props.id;
    $.ajax({
      method: 'POST',
      url: `http://localhost:3001/api/vegetables`,
      data: {
        name: name,
        description: description,
        userId: user
      }
    })
    .then(res => {
      console.log('res is ', res);
      this.setState({newVegName: '', newVegDescription:''});
    }, err => {
      console.log(err);
    });
  }
  handleNameChange(e){
    this.setState({newVegName: e.target.value});
  }
  handleDescriptionChange(e){
    this.setState({newVegDescription: e.target.value});
  }
  render() {
    let veggieNodes = this.props.vegetables.map(vegetable => {
      return (
        <Vegetable
          currentUserId={this.props.id}
          name={vegetable.name}
          description={vegetable.description}
          username={vegetable.username}
          vegetableUserId={vegetable.user}
          onVegetableDelete = {this.props.onVegetableDelete}
          key={vegetable._id}
          vegetable_id={vegetable._id}
          >
          I am a veggie
        </Vegetable>
      )
    })
    return (
      <div>
        { veggieNodes }
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Veggie Name'
            value={ this.state.newVegName }
            onChange={this.handleNameChange}
            />
          <input
            type='text'
            placeholder='description'
            value={ this.state.newVegDescription }
            onChange={this.handleDescriptionChange}
            />
          <Button type='submit' value='Add a Vegetable'>Add a Vegetable</Button>
        </form>
      </div>
    )
  }
}

export default VegetableList;
