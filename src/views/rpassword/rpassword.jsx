import React from 'react';
import RPassword from '../../components/login/restablecerPassword';
import {Container, Row, Col} from 'react-bootstrap';

const ResetPassword = () => (
  <div className="body">
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
        <RPassword />
        </Col>
      </Row>

    </Container>
  </div>

)

export default ResetPassword;
