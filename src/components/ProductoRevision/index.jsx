import React from "react";
import { Table } from "react-bootstrap";
import Fila from "./fila";
import "./style.css";
import withLoader from "../HOC/withLoader";

const Productos = ({ historial }) => {
  const total =
    historial.menus !== undefined
      ? historial.menus.reduce(function (suma, c) {
          return parseFloat(suma) + parseFloat(c.precioFinal);
        }, 0)
      : 0.0;

  return (
    <Table
      responsive
      hover
      className="bg-white shadow-sm tabla-producto-revision"
    >
      <thead>
        <tr>
          <th>Cant.</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {historial.menus !== undefined
          ? historial.menus.map((h) => <Fila key={h.idMenu} historial={h} />)
          : ""}
        <tr>
          <td colSpan="4">
            <h6 className="text-right">
              <strong>Subtotal: Q.{parseFloat(total).toFixed(2)}</strong>
            </h6>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
export default withLoader(Productos, "historial");
