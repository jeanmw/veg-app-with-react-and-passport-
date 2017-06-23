import React, {Component} from 'react';
import { Button, Card, Row, Col } from 'react-materialize';

class Vegetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.deleteVegetable = this.deleteVegetable.bind(this);
  }
  deleteVegetable(e) {
    e.preventDefault();
    let id = this.props.vegetable_id;
    this.props.onVegetableDelete(id);
    console.log('veggie is gone.');
  }
  render() {
    if(this.props.vegetableUserId === this.props.currentUserId){
      return (
        <div className='my-veg'>
          <h3>{this.props.name} from {this.props.username}&#39;s farm</h3>
          <p>{this.props.description}</p>
          <Button className='danger-button' onClick={this.deleteVegetable}>kill veg</Button>
        </div>
      )
    } else {
      return(

        <div className='any-veg'>
          <h3>{this.props.name} from {this.props.username}&#39;s farm</h3>
          <p>{this.props.description}</p>
        </div>
      )
    }
  }
}

export default Vegetable;
