import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import CardConfirmacion from '../../components/CardConfirmacion/CardConfirmacion';

const Confirmacion = ({match}) =>{
  return(
    <Container fluid>
      <Row>
        <Col sm={12} md={12} xl={12}>
          <CardConfirmacion token={match.params.token} />
        </Col>
      </Row>
    </Container>
  );
}

export default Confirmacion;
