import React from "react";
import Mapa from "../Mapa/Mapa";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tienda from "../class/tiendasClass";
import "./style.css";
import { connect } from "react-redux";
import { updateDireccion } from "../../actions/direccionActions";

class PickAndGo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ubicacion: {},
      map: {},
      marker: {},
    };
  }

  render() {
    return (
      <>
        <h1 className="titulo-pick-and-go">
          <strong>Escoge un restaurante</strong>
        </h1>
        <p className="escoger">
          Selecciona la sucursal donde deseas recoger tu orden.
        </p>
        <Container>
          <Row>
            <Col sm={12} md={6} xl={6}>
              <div className="tiendas-container">
                <Row>
                  <Tienda
                    agregaralcarrito={() => {}}
                    getLocation={(ubicacion) => {
                      this.setState({ ubicacion: ubicacion });
                    }}
                    mapa={this.state.map}
                    nextstep={this.props.nextstep}
                    marker={this.state.marker}
                  />
                </Row>
              </div>
            </Col>
            <Col sm={12} md={6} xl={6}>
              <Mapa
                buscador={false}
                boton={false}
                cobertura={true}
                id={"1"}
                getMarker={(marker) => {
                  this.setState({ marker: marker });
                }}
                direccionSeleccionada={this.state.ubicacion}
                getMapa={(mapa) => {
                  this.setState({ map: mapa });
                }}
              />
              {this.props.showSaveButton ? (
                <Button
                  variant="danger"
                  type="button"
                  className="registrar"
                  onClick={
                    Object.keys(this.state.ubicacion).length > 0
                      ? this.props.agregaralcarrito
                      : () => {}
                  }
                  id="btn-danger"
                >
                  Guardar
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

PickAndGo.defaultProps = {
  nextstep: () => {},
  agregaralcarrito: () => {},
  showSaveButton: false,
};
function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
  };
}

export default connect(null, mapDispatchToProps)(PickAndGo);
