import React, { Component } from 'react';
import $ from 'jquery-ajax';
import VegetableList from './VegetableList';
import { Button, Card, Row, Col } from 'react-materialize';

class VegetableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {vegetables: []};
    console.log("in veggie box", this.state)
    this.loadVegetablesFromServer = this.loadVegetablesFromServer.bind(this);
    this.handleVegetableDelete = this.handleVegetableDelete.bind(this);
  }
  loadVegetablesFromServer(){
    $.ajax({
      method: 'GET',
      url: `http://localhost:3001/api/vegetables`
    })
    .then((res) => {this.setState({vegetables: res})});
  }
  handleVegetableDelete(targetVeggie) {
    console.log('target :', targetVeggie);
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3001/api/vegetables/${targetVeggie}`
    })
    .then((res)=> {
      console.log('deleting veg');
    })
  }

  componentDidMount() {
    this.loadVegetablesFromServer();
    console.log('mounting veggiebox props', this.props)
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps !== prevState){
      this.loadVegetablesFromServer();
    }
  }
  componentWillUnmount(){
    console.log('veggie box unmounting')
  }

  render(){
      return (
        <div>
          <h3>Logged in as {this.props.username}</h3>
          <VegetableList
            username = {this.props.username}
            id = {this.props.id}
            isAuthenticated = {this.props.isAuthenticated}
            onVegetableDelete = {this.handleVegetableDelete}
            vegetables = {this.state.vegetables}
            />
        </div>
      )
  }
}

export default VegetableBox;
