import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Mapa from "../../components/Mapa/Mapa";
import Form from "react-bootstrap/Form";
import withModal from "../../components/HOC/withModal";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import { ultimaDireccion } from "../../util/funciones";
import { updateocasion } from "../../actions/ocasionActions";
import { updateDireccion } from "../../actions/direccionActions";
import InputMask from "react-input-mask";
import axios from "axios";
import { connect } from "react-redux";
import "./style.css";

//TODO: remove commented colonia
class Direcciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ubicacion: {},
      Departamentos: [],
      Municipios: [],
      nombre: "",
      telefono: "",
      direccion: "",
      // colonia: "",
      // zona: "",
      // codigoAcceso: "",
      // numeroCasa: "",
      departamento: {},
      municipio: 0,
      nombreMunicipios: "",
      referencias: "",
      id: 0,
      map: {},
      nombreDepartamento: "",
    };
    this.onchange = this.onchange.bind(this);
    this.setField = this.setField.bind(this);
    this.onchangeMunicipio = this.onchangeMunicipio.bind(this);
    this.save = this.save.bind(this);
    this.cargarDatos = this.cargarDatos.bind(this);
  }
  setField(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  cargarDatos() {
    this.setState({
      id: this.props.direccionSeleccionada.id,
      nombre: this.props.direccionSeleccionada.nombre,
      telefono: this.props.direccionSeleccionada.telefono,
      direccion: this.props.direccionSeleccionada.direccion,
      // colonia: this.props.direccionSeleccionada.colonia,
      // zona: this.props.direccionSeleccionada.zona,
      // codigoAcceso: this.props.direccionSeleccionada.codigoAcceso,
      // numeroCasa: this.props.direccionSeleccionada.numeroCasa,
      departamento: this.props.direccionSeleccionada.departamento,
      municipio: this.props.direccionSeleccionada.municipio.id,
      nombreMunicipios: this.props.direccionSeleccionada.municipio.nombre,
      referencias: this.props.direccionSeleccionada.referencias,
    });
  }
  componentDidMount() {
    if (Object.keys(this.props.direccionSeleccionada).length !== 0) {
      this.cargarDatos();
      axios
        .get(
          `/clientapp-web/webresources/direccion/municipios/${this.props.direccionSeleccionada.departamento.id}`
        )
        .then((resp) => {
          this.setState({
            Municipios: resp.data.municipios,
          });
        });
    }
    axios
      .get("/clientapp-web/webresources/direccion/departamentos")
      .then((resp) => {
        this.setState({
          Departamentos: resp.data.departamentos,
        });
      });
  }

  onchangeMunicipio(e) {
    var index = e.nativeEvent.target.selectedIndex;
    let nombreMunicipio = e.nativeEvent.target[index].text;
    this.setState({
      municipio: e.target.value,
      nombreMunicipios: nombreMunicipio,
    });
  }

  onchange(e) {
    let id = e.target.value;
    axios
      .get(`/clientapp-web/webresources/direccion/municipios/${id}`)
      .then((resp) => {
        this.setState({
          Municipios: resp.data.municipios,
        });
      });
    this.setState({
      departamento: id,
      nombreDepartamento: e.nativeEvent.target[id].text,
    });
  }

  saveHook(dataDireccion) {
    if (!Object.keys(dataDireccion).length > 0) return;
    if (Object.keys(this.props.direccionSeleccionada).length === 0) {
      axios
        .post("/clientapp-web/webresources/direccion/save", dataDireccion)
        .then((resp) => {
          // if (resp.data.result === true) {
          swal("Bien hecho!", `${resp.data.msg}`, "success");
          //    this.props.updateDireccion(ultimaDireccion());
          //TODO:para automatizar
          this.props.getDirecciones();
          // this.props.updateocasion("DOM");
          this.props.onHide();
          // } else {
          //   swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          // }
        });
    } else {
      axios
        .post("/clientapp-web/webresources/direccion/update", dataDireccion)
        .then((resp) => {
          if (resp.data.result === true) {
            swal("Bien hecho!", `${resp.data.msg}`, "success");
            //this.props.updateDireccion(ultimaDireccion(this.props.getDirecciones()));
            this.props.getDirecciones();
            this.props.onHide();
          } else {
            swal("Ocurrio un error!", `${resp.data.msg}`, "error");
          }
        });
    }
    if (Object.keys(this.state.ubicacion).length > 0) {
      swal("Felicidades", `si hay cobertura`, "success");
    } else {
      swal(
        "Ocurrio un error!",
        `Lo sentimos, por el momento no contamos con cobertura para esa dirección, puede ordenar para pasar a traer en su restaurante mas cercano`,
        "info"
      );
    }
  }
  save(e) {
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
      let dataDireccion = {
        id: this.state.id,
        nombre: `${this.state.nombre}`,
        telefono: `${this.state.telefono}`,
        direccion: `${this.state.direccion}`,
        referencias: `${this.state.referencias}`,
        // colonia: `${this.state.colonia}`,
        // zona: `${this.state.zona}`,
        // codigoAcceso: `${this.state.codigoAcceso}`,
        // numeroCasa: `${this.state.numeroCasa}`,
        municipio: {
          id: parseInt(this.state.municipio),
          nombre: `${this.state.nombreMunicipios}`,
        },
        departamento: {
          id: parseInt(this.state.departamento),
          nombre: this.state.nombreDepartamento,
        },
        idCliente: this.props.user.idCliente,
        latitud: `${this.state.ubicacion.lat}`,
        longitud: `${this.state.ubicacion.lng}`,
      };

      //TODO: saving state
      if (!this.state.ubicacion.error)
        //TODO: remove this errorMsg (errors are related to "pedido" and not for "ubicacion") this.state.ubicacion.errorMsg
        swal({
          title: "¿Deseas guardar esta dirección?",
          text: "Lo sentimos, por el momento no contamos con cobertura para esa dirección, puede ordenar para pasar a traer en su restaurante mas cercano",
          icon: "info",
          buttons: true,
          dangerMode: true,
        }).then((confirmSaving) => {
          if (confirmSaving) this.saveHook(dataDireccion);
          else return;
        });
      else this.saveHook(dataDireccion);
      e.preventDefault();
    }
  }

  render() {
    const departamentos = this.state.Departamentos;
    const municipios = this.state.Municipios;
    const direccion = this.props.direccionSeleccionada;
    return (
      <>
        <Row>
          <Col sm={12} xl={6} md={12}>
            <Mapa
              getLocation={(ubicacion) => {
                this.setState({ ubicacion: ubicacion });
              }}
              direccionSeleccionada={direccion}
              buscador={true}
              boton={true}
              cobertura={true}
              getMapa={(mapa) => {
                this.setState({ map: mapa });
              }}
            />
          </Col>
          <Col sm={12} xl={6} md={12}>
            <Form className="needs-validation" noValidate>
              <Form.Row>
                <Form.Group as={Col} controlId="nombreUbicacion">
                  <p className="etiquetas">Nombre de la Ubicación* </p>
                  <Form.Control
                    defaultValue={this.state.nombre}
                    onChange={this.setField}
                    name="nombre"
                    type="text"
                    placeholder=" Nombre Ubicacion"
                    required
                  />
                  <div className="invalid-tooltip">
                    Ingresa un nombre de ubicación
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlId="telefono">
                  <p className="etiquetas">Teléfono* </p>
                  <InputMask
                    mask="9999-9999"
                    value={this.state.telefono}
                    onChange={this.setField}
                    name="telefono"
                    type="text"
                    placeholder=" Telefono"
                    required
                  >
                    <Form.Control />
                  </InputMask>
                  <div className="invalid-tooltip">Ingresa un Teléfono</div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="direccion">
                  <p className="etiquetas">Dirección* </p>
                  <Form.Control
                    defaultValue={this.state.direccion}
                    onChange={this.setField}
                    name="direccion"
                    type="text"
                    placeholder=" Direccion"
                    required
                  />
                  <div className="invalid-tooltip">Ingresa una Dirección</div>
                </Form.Group>
                {/* <Form.Group as={Col} controlId="colonia">
                  {console.log("colonia", this.state.colonia)}
                  <p className="etiquetas">Colonia* </p>
                  <Form.Control
                    defaultValue={this.state.colonia}
                    onChange={this.setField}
                    name="colonia"
                    type="text"
                    placeholder=" Colonia"
                    required
                  />
                  <div className="invalid-tooltip">Ingresa una Colonia</div>
                </Form.Group> */}
              </Form.Row>
              <Form.Row>
                {/* <Form.Group as={Col} controlId="zona">
                  <p className="etiquetas">Zona* </p>
                  <Form.Control
                    defaultValue={this.state.zona}
                    onChange={this.setField}
                    name="zona"
                    type="text"
                    placeholder=" Zona"
                    required
                  />
                  <div className="invalid-tooltip">Ingresa una Zona</div>
                </Form.Group> */}
                {/* <Form.Group as={Col} controlId="codigoAcceso">
                  <p className="etiquetas">Código Acceso* </p>
                  <Form.Control
                    defaultValue={this.state.codigoAcceso}
                    onChange={this.setField}
                    name="codigoAcceso"
                    type="text"
                    placeholder="Codigo Acceso"
                    required
                  />
                  <div className="invalid-tooltip">
                    Ingresa un Código Acceso
                  </div>
                </Form.Group> */}
              </Form.Row>
              {/* <Form.Row>
                <Form.Group as={Col} controlId="edificio">
                  <p className="etiquetas">
                    Número de casa,apartamento, edificio*{" "}
                  </p>
                  <Form.Control
                    defaultValue={this.state.numeroCasa}
                    onChange={this.setField}
                    name="numeroCasa"
                    type="text"
                    placeholder="Número de casa,apartamento, edificio"
                    required
                  />
                  <div className="invalid-tooltip">
                    Ingresa un Número de casa,apartamento, edificio
                  </div>
                </Form.Group>
              </Form.Row> */}
              <Form.Row>
                <Form.Group as={Col} controlId="departamento">
                  <p className="etiquetas">Departamento*</p>
                  <Form.Control
                    name="departamento"
                    as="select"
                    onChange={this.onchange}
                    required
                  >
                    <option value="">Selecciona un Departamento</option>

                    {departamentos.map((d) => (
                      <option
                        key={d.id}
                        value={d.id}
                        selected={
                          this.state.departamento.id === d.id ? "selected" : ""
                        }
                      >
                        {d.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <div className="invalid-tooltip">Ingresa un Departamento</div>
                </Form.Group>
                <Form.Group as={Col} controlId="municipio">
                  <p className="etiquetas">Municipio*</p>
                  <Form.Control
                    onChange={this.onchangeMunicipio}
                    name="municipio"
                    as="select"
                    required
                  >
                    <option value="">Selecciona Municipio</option>
                    {municipios.map((m) => (
                      <option
                        key={m.id}
                        value={m.id}
                        selected={
                          m.id === this.state.municipio ? "selected" : ""
                        }
                      >
                        {m.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <div className="invalid-tooltip">Ingresa un Municipio</div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="referencia">
                  <p className="etiquetas">Referencias</p>
                  <Form.Control
                    defaultValue={this.state.referencias}
                    onChange={this.setField}
                    as="textarea"
                    rows="3"
                    cols="10"
                    className="textarea"
                    name="referencias"
                    required
                  />
                  <div className="invalid-tooltip">Ingresa una Referencia</div>
                </Form.Group>
              </Form.Row>

              <Button
                variant="danger"
                type="button"
                className="registrar"
                onClick={this.save}
                id="btn-danger"
              >
                Aceptar
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateocasion: (item) => dispatch(updateocasion(item)),
    updateDireccion: (item) => dispatch(updateDireccion(item)),
  };
}
function mapStatetoProp(state, props) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStatetoProp,
  mapDispatchToProps
)(withModal(Direcciones));
