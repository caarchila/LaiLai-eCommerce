import React from 'react';
import { MDBIcon } from "mdbreact";
import './styles.css';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import Munieco from './Munieco';
import ProductoCarritoCompras from './ProductoCarritoCompras/ProductoCarritoCompras';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modalActions';
import axios from 'axios'
import ModalEditarProducto from '../ModalEditarProducto';
import Redireccionar from '../class/redireccionar';
import { growl } from "@crystallize/react-growl";

class CarritoCompras extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show:false,
      detalleProducto:{},
      detalleSelected:{},
      procesar:false,
      url : ""
    }
    this.handleClose = this.handleClose.bind(this);
    this.getIdProducto = this.getIdProducto.bind(this);
    this.procesarCompra = this.procesarCompra.bind(this);
  }

  handleClose(){
    this.props.showModal(false)
  }
  async procesarCompra(){
    if(Object.keys(this.props.user).length > 0){
      if(this.props.cart.length >0){
        this.setState({
          procesar:true,
          url:"/detalleOrden/1"
        },()=>{
          this.setState({
            procesar:false
          },()=>{
                this.props.showModal(false);
          })
        });
      }else{
        const myGrowl = await growl({
          type: "info",
          title: "información",
          message: "No puede procesar la compra porque no tiene productos en el stock.",
        });
      }
    }else{
      this.setState({
        url:"/login",
        procesar:true
      },()=>{
        this.setState({
          procesar:false
        },()=>{
              this.props.showModal(false);
        })
      });
    }
  }
  getIdProducto(value){
        axios.get(process.env.REACT_APP_BASE_URL + `getMenuDetail/${value.idMenu}`)
        .then(resp => {
           this.setState({
                          detalleProducto:resp.data.menu,
                          detalleSelected:value
                        },()=>{
                  this.setState({show:true});
           });
        });
  }

  render(){
      const carrito = this.props.cart;
      const total = carrito.reduce(function(suma,c) { return parseFloat(suma) + parseFloat(c.precioFinal)},0)
      const detalle = this.state.detalleProducto;
      const productoSelected = this.state.detalleSelected;
      const estadoProcesar = this.state.procesar;
      const url = this.state.url;
    return(
      <>
      <Modal size="lg" dialogClassName="contenedor-dialog-carrito" show={this.props.modal} onHide={this.handleClose} contentClassName="contenedorCarritoCompras">
          <div className="headerCarritoCompras text-left">
              <h3><strong>Orden</strong></h3>
              <button className="cerrarCarrito" onClick={this.handleClose}> <MDBIcon icon="times" /></button>
          </div>
          <div className="contenedorOrdenes">
          {
              carrito.map(c =>(<ProductoCarritoCompras key={c.id} carrito={c} levantarIdProducto={this.getIdProducto}/>))
            }
          </div>
          <Row>
            <Col sm={6} md={6} xl={6}>
          <h4>  <strong>Total Q {parseFloat(total).toFixed(2)}</strong></h4>
              <Button id="btnProcesarOrden" onClick={this.procesarCompra}>Procesar mi orden</Button>
            </Col>
            <Col  sm={6} md={6} xl={6}>
                <Munieco />
            </Col>
          </Row>
      </Modal>
      <ModalEditarProducto show={this.state.show} onHide={()=>this.setState({show:false})} detalleMenu={detalle} detalleSelected={productoSelected}/>
      <Redireccionar url={url} estado={estadoProcesar}/>
      </>
    );
  }
}

function mapStateToProps(state, props){
  return {
    cart : state.cart,
    modal : state.modal,
    user : state.user
  };
}

function mapDispatchToProps(dispatch){
  return {
    showModal : item => dispatch(showModal(item))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CarritoCompras);
