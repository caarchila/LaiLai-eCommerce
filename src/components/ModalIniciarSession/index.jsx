import React from "react";
import { Modal, Button } from "react-bootstrap";
import Login from "../login/tarjeta";
import Registrarme from "../registro/registrarme";
import { Container, Row, Col } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import "./styles.css";
class ModalIniciarSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openRegister: false,
      vistoIs: "",
      vistoRg: "",
    };
  }
  render() {
    return (
      <Modal
        centered
        {...this.props}
        className="modal-editar-producto"
        dialogClassName="modal-90w"
        onHide={() => {
          this.setState({
            openLogin: false,
            openRegister: false,
            vistoIs: "",
            vistoRg: "",
          });
          this.props.onHide();
        }}
      >
        <Modal.Header id="contained-modal-title-vcenter" closeButton>
          <h3 id="titulos">¡Inicio sesión requerido!</h3>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <p>
            Brindanos tu información para verificar nuestros puntos de cobertura
            y poder atenderte de la mejor manera.
          </p>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <Button
                  onClick={() =>
                    this.setState({
                      openLogin: !this.state.openLogin,
                      openRegister: false,
                      vistoIs: "d-none",
                      vistoRg: "",
                    })
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state.openLogin}
                  className={`btn-block ${this.state.vistoIs}`}
                  id="btn-danger"
                >
                  Iniciar Sesión
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  onClick={() =>
                    this.setState({
                      openRegister: !this.state.openRegister,
                      openLogin: false,
                      vistoIs: "",
                      vistoRg: "d-none",
                    })
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state.openRegister}
                  className={`btn-block ${this.state.vistoRg}`}
                  id="btn-danger"
                >
                  Registrarme
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Collapse in={this.state.openLogin}>
          <div id="example-collapse-text">
            <Login
              anyWhere={true}
              onHide={() => {
                this.props.onHide();
              }}
              agregaralcarrito={() => {
                this.props.agregaralcarrito();
              }}
            />
          </div>
        </Collapse>
        <Collapse in={this.state.openRegister}>
          <div id="example-collapse-text">
            <Registrarme
              anyWhere={true}
              onHide={() => {
                this.props.onHide();
              }}
              agregaralcarrito={() => {
                this.props.agregaralcarrito();
              }}
            />
          </div>
        </Collapse>
      </Modal>
    );
  }
}

ModalIniciarSession.defaultProps = {
  agregaralcarrito: () => {},
  onHide: () => {},
};
export default ModalIniciarSession;
