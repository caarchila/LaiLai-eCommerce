import React from 'react';
import {Alert, Badge, Image} from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import './styles.css';
import { removeFromCart} from '../../../actions/cartActions';
import {connect} from 'react-redux';

class ProductoCarritoCompras extends React.Component{
      constructor(props){
        super(props);
        this.getIdProducto = this.getIdProducto.bind(this);
      }

      getIdProducto(e,value){
        e.preventDefault();
        e.stopPropagation();
        this.props.levantarIdProducto(value);
      }
  render(){
    return(
      <Alert variant={"secondary"} className="d-flex justify-content-between my-1 contenedor-pro-carrito-comp" onClick={(e) => {this.getIdProducto(e, this.props.carrito)}}>
        <Badge variant={"dark"} className="cantidadCarritoCompras">{this.props.carrito.cantidad}</Badge>
        <Image src={(this.props.carrito.imagenes.small !== undefined)?this.props.carrito.imagenes.small:this.props.carrito.imagenes.unavailable} className="imagen-pro-carrito-comp" rounded />
        <div className="contenidoProducto">
          <strong>{this.props.carrito.nombre}</strong><br/>
           {this.props.carrito.descripcion}
        </div>
        <Badge variant="warning" className="cantidadCarritoCompras">{parseFloat(this.props.carrito.precioFinal).toFixed(2)}</Badge>
        <button className="eliminarCarrito" onClick={(e)=>{e.stopPropagation();this.props.removeFromCart(this.props.carrito);}}> <MDBIcon className="eliminarCarritoIcon" icon="times" /></button>
      </Alert>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    removeFromCart : item => dispatch(removeFromCart(item))
  }
}

export default connect(null, mapDispatchToProps)(ProductoCarritoCompras);
