import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './styles.css';
import {Link} from 'react-router-dom';
const CardConfirmacion = ({token}) =>{
  return(
    <Card body className="p-3 m-5">
      <div className="contenedor-confirmacion">
        <p className="h2">¡Compra realizada!</p>
        <p className="h6">Tu pedido ha sido enviado con el siguiente código</p>
        <h1 className="h1 text-danger"><strong>{token}</strong></h1>
        <p>Recibirás un correo electrónico con el detalle de tu pedido a la dirección que tienes registrada en nuestro sitio web.</p>
        <Link to="/"><Button variant="danger" id="volver" size="lg">Regresar al inicio</Button></Link>
      </div>
    </Card>
  )
}

export default CardConfirmacion;
