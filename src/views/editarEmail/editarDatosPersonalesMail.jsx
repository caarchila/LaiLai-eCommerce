import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { FormControl } from "react-bootstrap";
import { connect  } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup'
import './style.css';

class EditarMail extends Component {


  render(){
    const perfil = this.props.user
    return(
      <>
        <div className="cuerpos">
          <Container fluid>
            <Row>
              <Col sm={12} md={12} xl={12}>
                <div className="perfil">
                  <Row>
                      <Col sm={12} md={12} xl={12}>
                        <div className="contra">
                          <h1 >Editar información de contacto</h1>
                          <p>Actualiza tu informacion personal</p>
                        </div>
                      </Col>
                  </Row>
                  <h5 className="my-4"><strong>Informacion Personal</strong></h5>
                  <hr />
                  <Row>
                    <Col sm={12} md={12} xl={6}>
                        <div>
                            <h6><strong>Email:</strong></h6>
                              <InputGroup className="mb-3">
                              <FormControl
                                defaultValue={perfil!== undefined ? perfil.email:''}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </InputGroup>
                        </div>
                    </Col>
                    <Col sm={12} md={12} xl={6}>
                        <div>
                            <h6><strong>Telefono:</strong></h6>
                              <InputGroup className="mb-3">
                                <FormControl
                                  defaultValue="(503) 7654-6565"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                />
                              </InputGroup>
                        </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12} xl={12}>
                      <Button variant="danger" type="submit" className="sesions">
                        Guardar
                      </Button>
                      <Link to="/perfil">
                        <Button variant="light" type="submit" className="sesions">
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
      </>
    )
  }
}

function mapStateToProps(state, props){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps,null) (EditarMail)
