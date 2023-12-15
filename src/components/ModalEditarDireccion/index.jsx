import React from "react";
import { Modal, Button } from "react-bootstrap";
import RadioDinamico from "../RadioDinamico/RadioDinamico";
import axios from "axios";
import { connect } from "react-redux";
import Direcciones from "../../views/Direcciones/direccion";

class ModalEditarDireccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direcciones: [],
      direccionEditar: {},
      show: false,
      emptyPromise: true,
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
    //TODO: i remove this url updated on index.js
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
            <RadioDinamico
              emptyPromise={emptyPromise}
              direcciones={direcciones}
              onShow={() => this.setState({ show: true })}
              getDireccionSeleccionada={this.getDireccionEditar}
              actualizarDirecciones={this.getDirecciones}
            />
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
              onClick={this.props.onHide}
            >
              Cancelar
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
  };
}

export default connect(mapStateToProps, null)(ModalEditarDireccion);
