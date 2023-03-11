import React from 'react';
import carretilla from '../../images/Carretilla.png';
import Badge from 'react-bootstrap/Badge';
import './style.css';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modalActions';

const Carretilla = ({cantidad, total, showModal}) =>
{
  const abrirCarrito = () =>{
      showModal(true);
  }
  return(
      <div id="contenedorCarretillaTotal">
      <button type="button" id="contenedorCarretilla" onClick={abrirCarrito}>
        <img  src={carretilla} alt="carretilla" id="carrito"/>
           <Badge id="cantidad" pill variant="danger">
            {cantidad}
          </Badge>
        </button>
        <span id="total">Q {total}</span>
      </div>)
};
function mapDispatchToProps(dispatch){
  return {
    showModal : item => dispatch(showModal(item))
  }
}
export default connect(null,mapDispatchToProps)(Carretilla);
