import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MenuAplicacion from '../../components/menu/menu';
import MenuHome from '../../components/class/menuhome';
import Promociones from '../../components/class/promociones';

const Home = () => (
  <Container fluid>
    <Row>
      <Col sm={12} md={12} xl={12}>
      <Promociones />
      </Col>
    </Row>
    <Row>
      <Col sm={12} md={12} xl={12}>
          <MenuAplicacion/>
      </Col>
    </Row>
    <Row>
        <MenuHome />
    </Row>
  </Container>
);

export default Home;
