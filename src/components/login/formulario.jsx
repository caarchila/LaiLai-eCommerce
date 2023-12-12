import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MDBIcon } from "mdbreact";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Redireccionar from "../class/redireccionar";
import "./style.css";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";

const eye = <FontAwesomeIcon icon={faEye} />;

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      email: "",
      password: "",
      login: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.iniciar = this.iniciar.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.respuestaGoogle = this.respuestaGoogle.bind(this);
    this.respuestaFacebook = this.respuestaFacebook.bind(this);
  }

  handleClick = (e) => {
    this.state.type
      ? this.setState({ type: false })
      : this.setState({ type: true });
  };

  respuestaGoogle = (respuesta) => {
    console.log(respuesta);
    console.log(respuesta.profileObj.givenName);
    console.log(respuesta.accessToken);
    let inicioDatos = {
      nombres: `${respuesta.profileObj.givenName}`,
      apellidos: `${respuesta.profileObj.familyName}`,
      email: `${respuesta.profileObj.email}`,
      token: `${respuesta.accessToken}`,
    };
    if (respuesta !== undefined) {
      axios
        .post(
          "http://104.238.249.113:8080/clientapp-web/webresources/account/login/api",
          inicioDatos
        )
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
              this.props.agregarAlCarrito();
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
        .post(
          "http://104.238.249.113:8080/clientapp-web/webresources/account/login/api",
          inicioDatos
        )
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
              this.props.agregarAlCarrito();
            }
          } else {
            swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          }
        });
    } else {
      swal("Ocurrio un error!", `revisa tu cuenta de facebook`, "error");
    }
  };
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  iniciar(e) {
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
    if (comprobacion) {
      let data = {
        email: `${this.state.email}`,
        clave: `${this.state.password}`,
      };
      axios
        .post(
          `http://104.238.249.113:8080/clientapp-web/webresources/account/login/local`,
          data
        )
        // .get(
        //   `http://104.238.249.113:8080/clientapp-web/webresources/account/login/local?email=${data.email}&clave=${data.clave}`
        // )
        .then((resp) => {
          if (resp.data.result === true) {
            swal("Bien hecho!", `${resp.data.msg}`, "success");
            sessionStorage.setItem("user", JSON.stringify(resp.data.client));
            this.props.updateUser(resp.data.client);
            if (this.props.anyWhere === false) {
              this.setState({
                login: true,
              });
            } else {
              this.props.onHide();
              this.props.agregarAlCarrito();
            }
          } else {
            swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          }
        });
    }
  }

  render() {
    const inicio = this.state.login;
    return (
      <>
        <Form className="needs-validation" noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <Form.Control
              name="email"
              type="text"
              required
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <strong>Contraseña</strong>
            </Form.Label>
            <Form.Control
              name="password"
              value={this.state.password}
              required
              onChange={this.handlePasswordChange}
              type={this.state.type ? "text" : "password"}
              placeholder="Password"
            />
            <i onClick={this.handleClick} className="iconcito">
              {eye}
            </i>
          </Form.Group>
          <center>
            <Button
              variant="danger"
              type="submit"
              className="sesion"
              id="btn-danger"
              onClick={this.iniciar}
            >
              Iniciar Sesión
            </Button>
            <br />
            <Link to="/restablecer-password">
              <strong>
                <h6>Restablecer Contraseña</h6>
              </strong>
            </Link>
            <br />
            <p>O también</p>
            <GoogleLogin
              // clientId="147967074326-n0mm039vb3p30697pd0r7not6blbc0bk.apps.googleusercontent.com"
              clientId="728422646612-budam0lbd8gp7gric6015bks6p5tav47.apps.googleusercontent.com"
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
          <Redireccionar url={"/"} estado={inicio} />
        </Form>
      </>
    );
  }
}

Formulario.defaultProps = {
  anyWhere: false,
  onHide: () => {},
  agregarAlCarrito: () => {},
};

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (item) => dispatch(updateUser(item)),
  };
}

export default connect(null, mapDispatchToProps)(Formulario);
