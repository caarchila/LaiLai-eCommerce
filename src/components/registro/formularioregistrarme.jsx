import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { MDBIcon } from "mdbreact";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import "./style.css";
const eye = <FontAwesomeIcon icon={faEye} />;

class FormularioRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      genero: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.setField = this.setField.bind(this);
    this.respuestaGoogle = this.respuestaGoogle.bind(this);
    this.respuestaFacebook = this.respuestaFacebook.bind(this);
  }

  handleClick = (e) => {
    this.state.type
      ? this.setState({ type: false })
      : this.setState({ type: true });
  };
  setField(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  respuestaGoogle = (respuesta) => {
    console.log(respuesta);
    console.log(respuesta.profileObj.givenName);
    console.log(respuesta.accessToken);
    let inicioDatos = {
      nombres: ` ${respuesta.profileObj.givenName}`,
      apellidos: ` ${respuesta.profileObj.familyName}`,
      email: ` ${respuesta.profileObj.email}`,
      token: ` ${respuesta.accessToken}`,
    };
    if (respuesta !== undefined) {
      axios
        .post("/clientapp-web/webresources/account/login/api", inicioDatos)
        .then((resp) => {
          if (resp.data.result === true) {
            swal("Bien hecho!", `${resp.data.msg}`, "success");
            resp.data.client.token = respuesta.accessToken;
            this.props.updateUser(resp.data.client);
            if (this.props.anyWhere === false) {
              this.setState({
                login: true,
              });
            } else {
              this.props.onHide();
              this.props.agregaralcarrito();
            }
          } else {
            swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          }
        });
    }
  };

  respuestaFacebook = (response) => {
    console.log(response);
    let inicioDatos = {
      nombres: ` ${response.name}`,
      apellidos: "",
      email: ` ${response.email}`,
      token: ` ${response.accessToken}`,
    };
    if (response !== undefined) {
      axios
        .post("/clientapp-web/webresources/account/login/api", inicioDatos)
        .then((resp) => {
          if (resp.data.result === true) {
            swal("Bien Hecho!", `${resp.data.msg}`, "success");
            resp.data.client.token = response.accessToken;
            this.props.updateUser(resp.data.client);
            if (this.props.anyWhere === false) {
              this.setState({
                login: true,
              });
            } else {
              this.props.onHide();
              this.props.agregaralcarrito();
            }
          } else {
            swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          }
        });
    } else {
      swal("Ocurrio un error!", `revisa tu cuenta de facebook`, "error");
    }
  };

  save(e) {
    e.preventDefault();
    let data = {
      nombres: `${this.state.nombre}`,
      apellidos: `${this.state.apellido}`,
      email: `${this.state.email}`,
      genero: `${this.state.genero}`,
      clave: `${this.state.password}`,
    };
    axios
      .post("/clientapp-web/webresources/account/save", data)
      .then((resp) => {
        if (resp.data.result === true) {
          swal("Bien hecho!", `${resp.data.msg}`, "success");
        } else {
          swal("Ocurrio un error!", `${resp.data.msg}`, "error");
        }
      });
  }

  render() {
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombres:</Form.Label>
              <Form.Control
                onChange={this.setField}
                name="nombre"
                type="text"
                placeholder=" Nombres"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Apellidos:</Form.Label>
              <Form.Control
                onChange={this.setField}
                name="apellido"
                type="text"
                placeholder="Apellidos"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={this.setField}
                name="email"
                type="email"
                placeholder=" Email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                onChange={this.setField}
                name="password"
                type={this.state.type ? "text" : "password"}
                placeholder="Password"
              />
            </Form.Group>
            <i onClick={this.handleClick} className="icons">
              {eye}
            </i>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Genero</Form.Label>
              <Form.Control
                onChange={this.setField}
                name="genero"
                as="select"
                defaultValue="Choose..."
              >
                <option value="0">Selecciona tu genero</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="NO">Prefiero no decirlo</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <center>
            <Button
              variant="danger"
              type="submit"
              className="registrar"
              onClick={(e) => this.save(e)}
            >
              Registrarme
            </Button>

            <br />
            <p>O también</p>
            <GoogleLogin
              clientId="147967074326-n0mm039vb3p30697pd0r7not6blbc0bk.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="btn btn-light btn-block"
                  disabled={renderProps.disabled}
                >
                  <MDBIcon fab icon="google" /> Continuar con Google
                </button>
              )}
              buttonText="Continuar con Google"
              onSuccess={this.respuestaGoogle}
              onFailure={this.respuestaGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <br />
            <FacebookLogin
              textButton="     Continuar con Facebook"
              cssClass="btn facebook btn-block"
              appId="3532390890161838"
              autoLoad={false}
              fields="name,email"
              callback={this.respuestaFacebook}
              icon={<MDBIcon fab icon="facebook-f" />}
              render={(renderProps) => (
                <button onClick={renderProps.onClick}>
                  This is my custom FB button
                </button>
              )}
            />
          </center>
        </Form>
      </>
    );
  }
}
FormularioRegistro.defaultProps = {
  anyWhere: false,
  onHide: () => {},
  agregaralcarrito: () => {},
};
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (item) => dispatch(updateUser(item)),
  };
}
export default connect(null, mapDispatchToProps)(FormularioRegistro);
