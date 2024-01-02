import React from "react";
import { Modal, Button } from "react-bootstrap";
import RadioDinamico from "../RadioDinamico/RadioDinamico";
import axios from "axios";
import { connect } from "react-redux";
import Direcciones from "../../views/Direcciones/direccion";
import direccion from "../../views/Direcciones/direccion";
import "./style.css";

class ModalEditarDireccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direcciones: [],
      direccionEditar: {},
      show: false,
      emptyPromise: true,
      showNoDirectionError: false,
    };
    this.getDirecciones = this.getDirecciones.bind(this);
    this.getDireccionEditar = this.getDireccionEditar.bind(this);
  }
  getDireccionEditar(direccionSeleccionada) {
    this.setState({
      direccionEditar: direccionSeleccionada,
    });
  }

  componentDidMount() {
    this.getDirecciones();
  }
  async getDirecciones() {
    let idCliente = this.props.user.idCliente;
    var direcciones = [];
    await axios
      .get(`/clientapp-web/webresources/direccion/list/${idCliente}`)
      .then((resp) => {
        if (resp.data.direcciones.length === 0) {
          this.setState({
            emptyPromise: true,
          });
        }
        this.setState({ direcciones: resp.data.direcciones }, () => {
          direcciones = this.state.direcciones;
        });
      });
    return direcciones;
  }

  render() {
    const direcciones = this.state.direcciones;
    const estado = this.state.show;
    const direccionSeleccionada = this.state.direccionEditar;
    const emptyPromise = this.state.emptyPromise;

    return (
      <>
        <Modal size="md" centered {...this.props} id="modal-editar-direccion">
          <Modal.Header closeButton>
            <Modal.Title>Elija una dirección</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            {direcciones && direcciones.length > 0 ? (
              <RadioDinamico
                emptyPromise={emptyPromise}
                direcciones={direcciones}
                onShow={() => this.setState({ show: true })}
                getDireccionSeleccionada={this.getDireccionEditar}
                actualizarDirecciones={this.getDirecciones}
                direccion={this.props.direccion ? direccion.id : undefined}
              />
            ) : (
              <p style={{ color: "#55555" }}>
                ¿Aún sin dirección de entrega? Agregalas ahora
              </p>
            )}
            {this.state.showNoDirectionError ? (
              <p className="error-direccion">
                ¡No te olvides de seleccionar una dirección!
              </p>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              type="button"
              className="sesion"
              onClick={() => this.setState({ show: true })}
            >
              Agregar nueva Direccion
            </Button>
            <Button
              variant="danger"
              id="btn-modal-editar"
              disabled={direcciones.length < 1 ? true : false}
              onClick={() => {
                console.log(Object.keys(this.props.direccion).length > 0);
                if (Object.keys(this.props.direccion).length > 0) {
                  this.setState({ showNoDirectionError: false });
                  console.log("cart", this.props.cart);
                  if (this.props.cart && this.props.cart.length < 1)
                    this.props.agregaralcarrito();
                  this.props.onAccept();
                } else {
                  console.log("nodireccion");
                  this.setState({ showNoDirectionError: true });
                }
              }}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
        <Direcciones
          show={estado}
          onHide={() => {
            this.setState({ show: false, direccionEditar: {} });
          }}
          size="xl"
          direccionSeleccionada={direccionSeleccionada}
          getDirecciones={this.getDirecciones}
          titulo="Agregar Dirección"
        />
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    direccion: state.direccion,
    cart: state.cart,
  };
}

export default connect(mapStateToProps, null)(ModalEditarDireccion);
