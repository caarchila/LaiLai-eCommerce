import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { connect  } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup'
import './style.css';

class EditarDatosPersonales extends Component {

  render(){
    const perfil = this.props.user
    return(
      <>
      <Card className="cardStyle p-3">
        <Card.Body>
            <div>
              <Container fluid>
                <Row>
                  <Col sm={12} md={12} xl={12}>
                    <div>
                      <Row>
                          <Col sm={12} md={12} xl={12}>
                            <div className="contra">
                              <h1 >Editar Nombre</h1>
                              <p>Actualiza tu información personal</p>
                            </div>
                          </Col>
                      </Row>
                      <h5 className="my-4"><strong>Información Personal</strong></h5>
                      <hr />
                      <Row>
                        <Col sm={12} md={12} xl={6}>
                            <div>
                                <h6><strong>Nombre:</strong></h6>
                                  <InputGroup className="mb-3">
                                  <FormControl
                                    defaultValue={perfil!== undefined ? perfil.nombres:''}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                  />
                                </InputGroup>
                            </div>
                        </Col>
                        <Col sm={12} md={12} xl={6}>
                            <div>
                                <h6><strong>Apellido:</strong></h6>
                                  <InputGroup className="mb-3">
                                    <FormControl
                                      defaultValue={perfil!== undefined ? perfil.apellidos:''}
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                    />
                                  </InputGroup>
                            </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={12} xl={12}>
                          <Button variant="danger" type="submit" className="sesions" id="btn-danger">
                            Guardar
                          </Button>
                          <Link to="/perfil">
                            <Button variant="light" type="submit" className="sesions colores">
                              cancelar
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
      </Card.Body>
    </Card>
      </>
    )
  }
}

function mapStateToProps(state, props){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null) (EditarDatosPersonales)
