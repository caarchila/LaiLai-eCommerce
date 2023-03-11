import React from 'react';
import Ordenes from '../../components/class/ordenes';
import {Container, Row, Col} from 'react-bootstrap';
import './style.css';
const MisOrdenes = () => (
  <div className="bodys">
    <Container fluid>
    <Row>
      <Col sm={12} md={12} xl={12}>
        <h1 className="ordenes"><strong>Mis Órdenes| Historial</strong></h1>
      </Col>
    </Row>
      <Row>
        <Ordenes />
      </Row>

    </Container>
  </div>

)

export default MisOrdenes;
