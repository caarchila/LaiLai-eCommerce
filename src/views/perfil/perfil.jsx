import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MDBIcon } from "mdbreact";
import { connect  } from 'react-redux';
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';
import Direcciones from '../Direcciones/direccion';
import RadioDinamico from '../../components/RadioDinamico/RadioDinamico'
import './style.css';
import axios from 'axios';

class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false,
      direcciones:[],
      direccionEditar:{},
      emptyPromise:true
    }
    this.getDirecciones = this.getDirecciones.bind(this);
    this.getDireccionEditar = this.getDireccionEditar.bind(this);
  }
 getDireccionEditar(direccionSeleccionada){
   this.setState({
     direccionEditar:direccionSeleccionada
   });
 }
  getDirecciones(){
    let idCliente = this.props.user.idCliente;
    axios.get(process.env.REACT_APP_BASE_URL + `direccion/list/${idCliente}`)
    .then(resp => {
      if(resp.data.direcciones.length === 0){
        this.setState({
          emptyPromise:true
        });
      }
        this.setState({direcciones:resp.data.direcciones})
    });
  }

  componentDidMount(){
    this.getDirecciones();
  }


  render(){
    const perfil = this.props.user
    const estado = this.state.show
    const direcciones = this.state.direcciones;
    const direccionSeleccionada = this.state.direccionEditar;
    const emptyPromise = this.state.emptyPromise;
    return(
      <>
          <Card className="cardStyle p-3">
            <Card.Body>
              <div>
                <Container fluid>
                  <Row>
                    <Col sm={12} md={12} xl={12}>
                      <div className="perfiles">
                        <Row>
                            <Col sm={12} md={12} xl={12}>
                              <div className="contra">
                                <h1 >Perfil y contraseña</h1>
                                <p>Puedes modificar tu información personal: nombre, contraseña y tus direcciones registradas.</p>
                              </div>
                            </Col>
                        </Row>
                        <h5 className="my-4"><strong>Información Personal</strong></h5>
                        <hr />
                        <Row>
                          <Col >
                              <h6><strong>Nombre y Apellido:</strong></h6>
                              <p>{perfil.nombres}  {perfil.apellidos}</p>
                          </Col>
                          <Col  >
                              <Link to="/editar-nombre-apellido">
                                   <button className="text-white rounded boton-editar text-center"><MDBIcon far icon="edit" /></button>
                              </Link>
                          </Col>
                          <Col sm={12} xl={6} md={6}>
                            <Row>
                              <Col >

                                      <h6><strong>Contraseña:</strong></h6>
                                      <p>*****************</p>

                              </Col>
                              <Col >
                                {
                                  this.props.user.token !== undefined
                                  ?
                                  ''
                                  :
                                  <Link to="/editar-contraseña">
                                      <div> <button className="text-white rounded boton-editar text-center"><MDBIcon far icon="edit" /></button></div>
                                  </Link>

                                }
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <h5 className="my-4"><strong>Información del contacto</strong></h5>
                        <hr />
                          <Row>
                            <Col sm={12} md={12} xl={11}>
                                <div>
                                    <h6><strong>Email:</strong></h6>
                                    <p>{perfil.email}</p>
                                </div>
                            </Col>
                          </Row>
                          <h5 className="my-4"><strong>Direcciones</strong></h5>
                          <hr />
                            <Row>
                              <Col sm={12} md={12} xl={6}>
                                      <RadioDinamico emptyPromise={emptyPromise} direcciones={direcciones} onShow={()=> this.setState({show:true})} getDireccionSeleccionada={this.getDireccionEditar} actualizarDirecciones={this.getDirecciones}/>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={12} md={12} xl={6}>
                                    <Button variant="danger" type="button" className="sesion" onClick={()=> this.setState({show:true})} id="btn-danger">
                                      Agregar nueva Dirección
                                    </Button>
                              </Col>
                            </Row>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Direcciones show={estado} onHide={()=>{this.setState({show:false,direccionEditar:{}})}} size="xl" direccionSeleccionada={direccionSeleccionada} getDirecciones={this.getDirecciones}/>
              </div>
            </Card.Body>
          </Card>


      </>
    )
  }

}
 function mapStateToProps(state, props){
   return {
        user: state.user
   }
 }

export default connect(mapStateToProps,null) (Perfil)
