import React from 'react';
import {Spinner} from 'react-bootstrap';

const withLoader = (WrappedComponent, valor) =>{
  return class WithLoader extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      return this.props[valor].length === 0?<Spinner animation="border" variant="primary" />:<WrappedComponent {...this.props} />
    }
  }
}

export default withLoader;
