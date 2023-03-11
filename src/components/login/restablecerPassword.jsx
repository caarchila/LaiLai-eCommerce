import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup'
import './style.css';


class RestablecerPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    let informacion = {
      email: `${this.state.email}`
    }
    axios.post('http://190.111.5.114:8282/clientapp-web/webresources/account/resetPassword',informacion)
    .then(resp => {
      if(resp.data.result === true)
      {
      swal("Good job!", `${resp.data.msg}`, "success");

    }else {
      swal("Fatal Error!", `${resp.data.msg}`, "error")
    }
    })
  }

  handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
         [name]: value,
     });

   }
  render(){
    return(
      <>
        <Card style={{ width: '358px' }} className="cascaron">
          <Card.Body>
            <Card.Title id="titulo">Restablecer Password</Card.Title>
            <label>Email:</label>
              <InputGroup className="mb-3">
              <FormControl
                type="email"
                aria-label="Username"
                name="email"
                aria-describedby="basic-addon1"
                onChange={this.handleChange}
              />
            </InputGroup>
            <Button
              variant="danger"
              type="submit"
              onClick={this.onSubmit}
            >
              Enviar
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}


export default RestablecerPassword;
