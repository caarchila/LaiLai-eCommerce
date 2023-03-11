import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Registrarme from '../../components/registro/registrarme';
import './style.css';


const Registro = () => (
  <div>
  <Container fluid>
    <Row>
      <Col sm={6} md={6} xl={6}>
        <div className="cuerpo">
          <strong><h1 className="cuenta">Crea tu Cuenta</h1></strong>
          <br />
          <h4 className="generales">Datos Generales</h4>
          <p className="texto">Necesitamos que nos brindes los siguientes datos para darte la mejor experiencia al momento de ordenar en línea.</p>
        </div>
      </Col>
      <Col sm={12} md={6} xl={6}>
        <Registrarme />
      </Col>
    </Row>

  </Container>
  </div>

)

export default Registro;
