import React from 'react';
import Card from 'react-bootstrap/Card';
import Formulario from './formulario';
import './style.css';


const Tarjeta = (props) =>(
  <>
    <Card  className="cascaron">
      <Card.Body>
        <Card.Text id="titulo"> ¿Ya posees una cuenta?</Card.Text>
        <Card.Title id="titulo">Iniciar Sesión</Card.Title>
        <Formulario anyWhere={props.anyWhere} onHide={()=>{props.onHide()}} agregarAlCarrito={()=>{props.agregarAlCarrito()}}/>
      </Card.Body>
    </Card>
  </>
);
Tarjeta.defaultProps = {
  anyWhere: false,
  onHide: ()=>{},
  agregarAlCarrito: ()=>{}
}
export default Tarjeta;
