import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { updateDireccion } from "../../actions/direccionActions";
import { updateUser } from "../../actions/userActions";
import { updateOcasion } from "../../actions/ocasionActions";
import { updateFechaEntrega } from "../../actions/fechaEntregaActions";
import { updateDetallePago } from "../../actions/detallePagoActions";
import { updatePedidoFuturo } from "../../actions/pedidoFuturoActions";
import "./style.css";
const eye = <FontAwesomeIcon icon={faEye} />;

class EditarDatosPersonales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      type1: false,
      type2: false,
      lastPassword: "",
      newPassword: "",
      confirmPassword: "",
      show: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.submit = this.submit.bind(this);
    const perfil = this.props.user;
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  cerrarSesion = () => {
    this.props.updateUser({});
    this.props.updateDireccion({});
    this.props.updateOcasion("");
    this.props.updatePedidoFuturo("N");
    this.props.updateFechaEntrega("");
    this.props.updateDetallePago("");
  };
  submit = (e) => {
    e.preventDefault();
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    let comprobacion = true;
    var validation = Array.prototype.filter.call(forms, function (form) {
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        comprobacion = false;
      }
      form.classList.add("was-validated");
    });

    let datos = {
      email: `${this.props.user.email}`,
      actualClave: `${this.state.lastPassword}`,
      nuevaClave: `${this.state.confirmPassword}`,
    };
    if (comprobacion) {
      //TODO: i remove this url updated on index.js
      axios
        .post("/clientapp-web/webresources/account/changePassword", datos)
        .then((resp) => {
          if (resp.data.result === true) {
            swal("Good job!", `${resp.data.msg}`, "success");

            this.cerrarSesion();
          } else {
            swal("Fatal Error!", `${resp.data.msg}`, "error");
          }
        });
    }
  };
  handleChange1(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = (e) => {
    this.state.type
      ? this.setState({ type: false })
      : this.setState({ type: true });
  };
  handleClick1 = (e) => {
    this.state.type1
      ? this.setState({ type1: false })
      : this.setState({ type1: true });
  };
  handleClick2 = (e) => {
    this.state.type2
      ? this.setState({ type2: false })
      : this.setState({ type2: true });
  };

  render() {
    const perfil = this.props.user;
    return (
      <>
        <Card className="cardStyle p-3">
          <Card.Body>
            <Form className="needs-validation" noValidate>
              <Container fluid>
                <Row>
                  <Col sm={12} md={12} xl={12}>
                    <Row>
                      <Col sm={12} md={12} xl={12}>
                        <div className="contra">
                          <h1>Editar Contraseña</h1>
                          <p>Actualiza tu información personal</p>
                        </div>
                      </Col>
                    </Row>
                    <h5 className="my-4">
                      <strong>Información Personal</strong>
                    </h5>
                    <hr />
                    <Row>
                      <Col sm={12} md={12} xl={6}>
                        <div>
                          <h6>
                            <strong>Contraseña Anterior:</strong>
                          </h6>
                          <InputGroup className="mb-3">
                            <FormControl
                              type={this.state.type ? "text" : "password"}
                              aria-label="Username"
                              name="lastPassword"
                              aria-describedby="basic-addon1"
                              required
                              onChange={this.handleChange}
                            />
                            <i onClick={this.handleClick} className="icon">
                              {eye}
                            </i>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {"Campo requerido."}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} xl={6}>
                        <div>
                          <h6>
                            <strong>Nueva Contraseña:</strong>
                          </h6>
                          <InputGroup className="mb-3">
                            <FormControl
                              type={this.state.type1 ? "text" : "password"}
                              aria-label="Username"
                              name="newPassword"
                              defaultValue={this.state.newPassword}
                              aria-describedby="basic-addon1"
                              required
                              onChange={this.handleChange}
                            />
                            <i onClick={this.handleClick1} className="icon">
                              {eye}
                            </i>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {"Campo requerido."}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </div>
                      </Col>
                      <Col sm={12} md={12} xl={6}>
                        <div>
                          <h6>
                            <strong>Confirmacion de Contraseña:</strong>
                          </h6>
                          <InputGroup className="mb-3">
                            <FormControl
                              type={this.state.type2 ? "text" : "password"}
                              aria-label="Username"
                              name="confirmPassword"
                              defaultValue={this.state.confirmPassword}
                              onChange={this.handleChange1}
                              aria-describedby="basic-addon1"
                              required
                            />
                            <i onClick={this.handleClick2} className="icon">
                              {eye}
                            </i>
                            <Form.Control.Feedback type="invalid" tooltip>
                              {"Campo requerido."}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </div>
                        {this.state.newPassword ===
                        this.state.confirmPassword ? (
                          ""
                        ) : (
                          <Alert variant="danger">
                            Las Contraseñas no coinciden
                          </Alert>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} xl={12}>
                        <Button
                          variant="danger"
                          onClick={this.submit}
                          type="submit"
                          className="sesions"
                          id="btn-danger"
                        >
                          Guardar
                        </Button>
                        <Link to="/perfil">
                          <Button
                            variant="light"
                            type="submit"
                            className="sesions colores"
                          >
                            cancelar
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (item) => dispatch(updateUser(item)),
    updateDireccion: (item) => dispatch(updateDireccion(item)),
    updateOcasion: (item) => dispatch(updateOcasion(item)),
    updateFechaEntrega: (item) => dispatch(updateFechaEntrega(item)),
    updateDetallePago: (item) => dispatch(updateDetallePago(item)),
    updatePedidoFuturo: (item) => dispatch(updatePedidoFuturo(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarDatosPersonales);
