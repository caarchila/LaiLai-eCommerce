import React from 'react';
import {Badge, Image} from 'react-bootstrap';

const Fila = ({historial}) =>(
  <>
    <tr>
      <td> <Badge className="cantidades-producto-revision" variant="dark">{historial.cantidad}</Badge></td>
      <td>
      {
        (historial.imagenes !== undefined)
        ?
        <>
          <Image src={(historial.imagenes.small !== undefined)?historial.imagenes.small:historial.imagenes.unavailable} className="mx-1" rounded />
          {'    '}<span>{historial.nombre}</span>
        </>
        :<span>{historial.nombre}</span>
      }</td>
      <td><Badge className="cantidades-producto-revision" variant="warning">Q.{parseFloat(historial.precioUnitario).toFixed(2)}</Badge></td>
      <td><Badge className="cantidades-producto-revision" variant="warning">Q.{parseFloat(historial.precioFinal).toFixed(2)}</Badge></td>
    </tr>
  </>
)

export default Fila;
