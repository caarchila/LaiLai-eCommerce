import React from 'react';
import {Card, Row} from 'react-bootstrap';
import './styles.css';
import DetalleDireccion from './DetalleDireccion';
import DetalleMetodoPago from './DetalleMetodoPago';
import ProgramarEntrega from './ProgramarEntrega';

class SeccionDatosPersonales extends React.Component{
  render(){
    return(
      <Card body className="seccion-datos-personales">
        <Row className="contenido-metodo-pago pb-3">
          <DetalleMetodoPago historial={this.props.historial}  boton={this.props.boton} />
        </Row>
        <Row className="contenido-direccion">
          <DetalleDireccion historial={this.props.historial} boton={this.props.boton} />
        </Row>
        <Row className="contenido-direccion">
          <ProgramarEntrega boton={this.props.boton} />
        </Row>
      </Card>
    );
  }
}

SeccionDatosPersonales.defaultProps = {
  getPedidoFuturo:()=>{}
}

export default SeccionDatosPersonales;
