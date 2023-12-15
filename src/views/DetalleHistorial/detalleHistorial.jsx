import React, { Component } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import SeccionDatosPersonales from "../../components/SeccionDatosPersonales/SeccionDatosPersonales";
import Resumen from "../../components/ResumenPago";
import Producto from "../../components/ProductoRevision";
import axios from "axios";
import { connect } from "react-redux";
import "./style.css";

class Historial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historial: [],
    };
  }

  componentDidMount() {
    if (parseInt(this.props.match.params.tipo) === 0) {
      //TODO: i remove this url updated on index.js
      axios
        .get(`/clientapp-web/webresources/order/${this.props.match.params.id}`)
        .then((resp) => {
          this.setState({
            historial: resp.data,
          });
        });
    } else {
      this.setState({
        historial: {
          menus: this.props.cart,
        },
      });
    }
  }

  render() {
    const historial =
      parseInt(this.props.match.params.tipo) === 0
        ? this.state.historial
        : { menus: this.props.cart };
    let idBoton = this.props.match.params.tipo;

    return (
      <Container fluid>
        <Row>
          <Col className="text-justify my-2">
            <h4>
              <strong>Finalización de Orden</strong>
            </h4>
            <p>
              Por favor verifique su orden y si todo está correcto confirme para
              preparar su pedido.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xl={8}>
            <Row>
              <Col>
                {historial.length === 0 ? (
                  <Spinner animation="grow" variant="warning" />
                ) : (
                  <SeccionDatosPersonales
                    historial={historial}
                    boton={idBoton}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 className="my-3">
                  <strong>Revisión de productos</strong>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                {historial.length === 0 ? (
                  <Spinner animation="grow" variant="warning" />
                ) : (
                  <Producto historial={historial} />
                )}
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={4} xl={4}>
            {historial.length === 0 ? (
              <Spinner animation="grow" variant="warning" />
            ) : (
              <Resumen historial={historial} boton={idBoton} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    cart: state.cart,
    user: state.user,
    direccion: state.direccion,
  };
}
export default connect(mapStateToProps, null)(Historial);
