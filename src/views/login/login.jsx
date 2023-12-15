import React from "react";
import Tarjeta from "../../components/login/tarjeta";
import Cuenta from "../../components/login/cuenta";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const Login = () => (
  <div className="body">
    <Container fluid className="container-cards">
      <Row>
        <Col sm={6} md={8} xl={6} className="card-login">
          <Tarjeta />
        </Col>
        <Col sm={12} md={6} xl={6}>
          <Cuenta />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
