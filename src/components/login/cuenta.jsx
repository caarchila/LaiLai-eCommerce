import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const Cuenta = () => (
  <>
  <Card style={{ width: '358px' }} className="cascaron">
    <Card.Body>
      <Card.Title id="titulo">Crea una Cuenta</Card.Title>
      <Card.Text id="titulo"> Para poder realizar tu orden deberás registrarte con una cuenta personal con tu información.</Card.Text>
      <br />
      <center>
        <Link to="/registrarme">
          <Button variant="danger" type="submit" className="sesion" id="btn-danger">
            Regístrarme
          </Button>
        </Link>
      </center>
    </Card.Body>
  </Card>
  </>
)

export default Cuenta;
