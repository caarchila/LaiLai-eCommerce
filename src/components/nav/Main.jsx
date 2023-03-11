import React from 'react';
import {Navbar} from 'react-bootstrap';
import './style.css';
import logo from '../../images/lailai.png';
import Carretilla from '../carretilla/Carretilla';
import Redes from '../redes/Redes';
import Boton from '../class/button';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import CarritoCompras from '../CarritoCompras/CarritoCompras';

class Menu extends React.Component{

render(){
  const totalProducto = this.props.cart.length;
  const total = this.props.cart.reduce(function(suma,c) { return parseFloat(suma) + parseFloat(c.precioFinal)},0)

  return(
    <>
      <CarritoCompras />
    <Navbar id="nav" expand="lg" sticky="top">
      <Link to="/"><img src={logo} alt="logo" id="logo"/></Link><Redes />
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Boton />
        <Carretilla cantidad={totalProducto} total={parseFloat(total).toFixed(2)} />
      </Navbar.Collapse>
      </Navbar>
    </>
    )
  }
}

function mapStateToProps(state, props){
  return {
    cart : state.cart
  };
}
export default connect(mapStateToProps,null)(Menu);
