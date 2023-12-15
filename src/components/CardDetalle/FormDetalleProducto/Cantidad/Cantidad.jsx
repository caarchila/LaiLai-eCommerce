import React from "react";
import { Alert } from "react-bootstrap";
import "./style.css";
import CantidadAnimation from "./CantidadAnimation";
class Cantidad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 1,
      toggle: false,
    };
    this.aumentar = this.aumentar.bind(this);
    this.disminuir = this.disminuir.bind(this);
    this.subirContador = this.subirContador.bind(this);
  }
  componentDidMount() {
    if (this.props.cantidadSelected !== undefined) {
      this.setState({ contador: this.props.cantidadSelected.cantidad }, () => {
        this.subirContador();
      });
    }
  }
  aumentar() {
    var conteo = this.state.contador;
    this.setState(
      {
        contador: ++conteo,
        toggle: true,
      },
      () => {
        this.subirContador();
        this.setState({
          toggle: false,
        });
      }
    );
  }
  subirContador() {
    this.props.subirCantidad(this.state.contador);
  }
  disminuir() {
    var conteo = this.state.contador;
    if (conteo !== 1) {
      this.setState(
        {
          contador: --conteo,
          toggle: true,
        },
        () => {
          this.subirContador();
          this.setState({
            toggle: false,
          });
        }
      );
    }
  }

  render() {
    const contador = this.state.contador;
    const toggle = this.state.toggle;
    return (
      <>
        <Alert
          variant="dark"
          id="contenedorCantidad"
          className="d-flex justify-content-between control-buttons"
        >
          <button
            type="button"
            className="btn-cantidad"
            onClick={this.disminuir}
          >
            -
          </button>
          <CantidadAnimation toggle={toggle} value={contador} />
          <button
            type="button"
            className="btn-cantidad-2"
            onClick={this.aumentar}
          >
            +
          </button>
        </Alert>
        <input type="hidden" value={contador} />
      </>
    );
  }
}

export default Cantidad;
