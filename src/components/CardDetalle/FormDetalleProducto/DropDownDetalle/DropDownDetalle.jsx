import React, { useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import DropDownItem from "./DropDownItem";
import "./style.css";

const DropDownDetalle = ({
  obj,
  getOpciones,
  carritoSeleccionado,
  edi,
  mostrarOpciones,
}) => {
  useEffect(() => {
    if (carritoSeleccionado === undefined) {
      var select =
        document.getElementById(`dropdown-detalle-${obj.idOpcion}`) || null;
      if (select) {
        select.selectedIndex = 0;
        agregarValores(select.value);
      } else {
        agregarValores(obj.variantes[0]);
      }
    } else {
      if (carritoSeleccionado.opciones.length > 0) {
        carritoSeleccionado.opciones.map((o) => {
          o.varianteSeleccionada.map((v) => {
            obj.variantes.map((vObj, index) => {
              if (vObj.idVariante === v.idVariante) {
                let select = document.getElementById(
                  `dropdown-detalle-${o.idOpcion + "" + edi}`
                );
                select.selectedIndex = index;
                agregarValores(vObj.idVariante);
              }
            });
          });
        });
      }
    }
  }, []);

  const handleOpciones = (e) => {
    agregarValores(e.target.value);
  };

  const agregarValores = (id) => {
    const variante = obj.variantes.filter(
      (v) => parseInt(v.idVariante) === parseInt(id)
    )[0];
    if (variante !== undefined) {
      var opcion = {
        idOpcion: obj.idOpcion,
        cantidad: 1,
        varianteSeleccionada: [
          {
            precioExtra: variante.precioExtra,
            idProducto: variante.idProducto,
            idVariante: variante.idVariante,
            default: variante.default,
            variante: variante.variante,
          },
        ],
      };
      getOpciones(opcion);
    }
  };
  return (
    <Col sm={12} md={6} xl={6}>
      <Form.Group className="variantes">
        {mostrarOpciones ? (
          <Form.Label className="dropdown-detalle-label">
            {obj.pregunta}
          </Form.Label>
        ) : (
          <></>
        )}
        {/* obj.variantes && obj.variantes.length > 1 ?  */}
        {mostrarOpciones ? (
          <Form.Control
            as="select"
            className="dropDownDetalle"
            id={`dropdown-detalle-${obj.idOpcion + "" + edi}`}
            onChange={handleOpciones}
          >
            {obj.variantes.map((v) => (
              <DropDownItem key={v.idVariante} obj={v} />
            ))}
          </Form.Control>
        ) : (
          <></>
        )}
      </Form.Group>
    </Col>
  );
};

export default DropDownDetalle;
