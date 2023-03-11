import  React from 'react';
import FormularioRegistro from './formularioregistrarme';
import Card from 'react-bootstrap/Card';
import './style.css';
const Registrarme = (props) => (
  <>

      <Card>
        <Card.Body>
          <Card.Text><strong>información Personal.</strong></Card.Text>
          <FormularioRegistro  anyWhere={props.anyWhere} onHide={()=>{props.onHide()}} agregarAlCarrito={()=>{props.agregarAlCarrito()}}/>
        </Card.Body>
      </Card>


  </>
)
Registrarme.defaultProps = {
  anyWhere: false,
  onHide: ()=>{},
  agregarAlCarrito: ()=>{}
}

export default Registrarme
