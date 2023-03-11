import React from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DropDownDetalle from "./DropDownDetalle/DropDownDetalle";
import Cantidad from "./Cantidad/Cantidad";
import { connect } from "react-redux";
import { addToCart, updateFromCart } from "../../../actions/cartActions";
import "./style.css";
import { generarId, comprobarSession } from "../../../util/funciones";
import Confirmacion from "../../Confirmacion/Confirmacion";
import { growl } from "@crystallize/react-growl";
import ModalIniciarSession from "../../ModalIniciarSession";
import ModalModalidadEntrega from "../../ModalModalidadEntrega";
import ModalEditarDireccion from "../../ModalEditarDireccion";

class FormularioDetalleProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opciones: [],
      totalOpciones: 0.0,
      cantidad: 1,
      mostrarModal: false,
      showSession: false,
      showModalidad: false,
      modalShow:false
    };
    this.subirTotal = this.subirTotal.bind(this);
    this.getOpciones = this.getOpciones.bind(this);
    this.agregarAlCarrito = this.agregarAlCarrito.bind(this);
    this.oculatModal = this.oculatModal.bind(this);
  }
  async agregarAlCarrito() {
    const opciones = this.state.opciones;
    const menu = this.props.detalle;
    const totalOpciones = this.state.totalOpciones;
    const cantidadProducto = this.state.cantidad;
    const isLogged = comprobarSession(this.props.user);

    var estado = true;
    for (var i = 0; i < opciones.length; i++) {
      opciones[i].cantidad = cantidadProducto;
    }
    if (this.props.detalleSelected !== undefined) {
      estado = false;
    }
    const precioFinal =
      (parseFloat(totalOpciones) + parseFloat(menu.precioUnitario)) *
      parseInt(cantidadProducto);
    var producto = {
      id: estado ? generarId(this.props.cart) : this.props.detalleSelected.id,
      cortesia: "N",
      descripcion: menu.descripcion,
      precioExtra: parseFloat(totalOpciones),
      precioFinal: precioFinal,
      idMenu: menu.idMenu,
      nombre: menu.nombre,
      opciones: opciones,
      precioUnitario: menu.precioUnitario,
      cantidad: cantidadProducto,
      imagenes: menu.imagenes,
    };
    if (estado) {
      if (isLogged) {
        if(Object.keys(this.props.direccion).length>0
            && this.props.fechaEntrega !== ""
            && this.props.detallePago !== ""){
          this.props.addToCart(producto);
          this.setState({
            mostrarModal: true,
            showModalidad:false
          });
        }else{
          this.setState({
            showModalidad: true,
          });
        }
      } else {
        this.setState({
          showSession: true,
        });
      }
    } else {
      this.props.updateFromCart(producto);
      this.props.onHide();
      const myGrowl = await growl({
        type: "info",
        title: "información",
        message: "Su producto se modificó correctamente.",
      });
    }
  }
  subirTotal(total) {
    this.setState({
      cantidad: total,
    });
    this.props.getProductoTotal(total);
  }

  oculatModal(estado) {
    this.setState({
      mostrarModal: estado,
    });
  }
  getOpciones(opcion) {
    var opciones = this.state.opciones;

    if (
      opciones.filter((o) => parseInt(o.idOpcion) === parseInt(opcion.idOpcion))
        .length > 0
    ) {
      var index = opciones.map((o) => o.idOpcion).indexOf(opcion.idOpcion);
      opciones[index] = opcion;
    } else {
      opciones.push(opcion);
    }

    this.setState(
      {
        opciones: opciones,
      },
      () => {
        const total = opciones.reduce(function (suma, o) {
          return (
            parseFloat(suma) + parseFloat(o.varianteSeleccionada[0].precioExtra)
          );
        }, 0);
        this.setState({
          totalOpciones: total,
        });
        this.props.getTotalOpciones(total);
      }
    );
  }
  render() {
    const mostrarModal = this.state.mostrarModal;
    const estado = Object.keys(this.props.detalle).length === 0 ? true : false;
    const showSession = this.state.showSession;
    const showModal = this.state.showModalidad;
    const modalShow = this.state.modalShow;

    return (
      <Form>
        <Row>
          {this.props.detalle.opciones === undefined ? (
            <Spinner animation="border" variant="info" />
          ) : (
            this.props.detalle.opciones.map((o, index) =>
              o.pregunta !== null ? (
                <DropDownDetalle
                  key={o.idOpcion}
                  carritoSeleccionado={this.props.detalleSelected}
                  edi={this.props.edi}
                  getOpciones={this.getOpciones}
                  obj={o}
                />
              ) : (
                ""
              )
            )
          )}
        </Row>
        <Row>
          <Col sm={12} md={6} xl={6}>
            <Cantidad
              subirCantidad={this.subirTotal}
              cantidadSelected={this.props.detalleSelected}
            />
          </Col>
          <Col sm={12} md={6} xl={6}>
            <Button
              variant="danger"
              type="button"
              id="btn-agregar-carrito"
              disabled={estado}
              className="my-2"
              onClick={this.agregarAlCarrito}
            >
              {this.props.detalleSelected === undefined
                ? "Agregar al carrito"
                : "Editar"}
            </Button>
          </Col>
        </Row>
        {mostrarModal ? (
          <Confirmacion mostrar={mostrarModal} ocultar={this.oculatModal} />
        ) : (
          ""
        )}
        <ModalIniciarSession
          show={showSession}
          size="md"
          onHide={() => {
            this.setState({ showSession: false });
          }}
          agregarAlCarrito={()=>{this.agregarAlCarrito()}}
        />
      <ModalModalidadEntrega
          show={showModal}
          size="lg"
          onHide={() => {
            this.setState({ showModalidad: false });
          }}
          agregarAlCarrito={()=>{this.agregarAlCarrito()}}
          openModalEditarDireccion={()=>{ this.setState({modalShow:true})}}
        />
      {(Object.keys(this.props.user).length > 0)?
        <ModalEditarDireccion
          show={modalShow}
          onHide={() => {
              this.setState({ modalShow:false,showModalidad:true });
          }}
        />:''
      }
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    updateFromCart: (item) => dispatch(updateFromCart(item)),
  };
}
function mapStateToProps(state, props) {
  return {
    cart: state.cart,
    user: state.user,
    direccion: state.direccion,
    fechaEntrega: state.fechaEntrega,
    detallePago: state.detallePago
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormularioDetalleProducto);
