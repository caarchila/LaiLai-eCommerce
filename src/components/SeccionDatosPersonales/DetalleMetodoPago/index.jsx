import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Col, Collapse } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { updateDetallePago } from "../../../actions/detallePagoActions";
import { growl } from "@crystallize/react-growl";

const DetalleHistorial = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.detallePago);
  useEffect(() => {
    if (parseInt(props.boton) === 0) {
      if (props.historial.detallePago !== undefined) {
        if (props.historial.detallePago[0].formaPago.trim() === "EFE") {
          setSelectedOption("EFE");
        } else {
          setSelectedOption("CRD");
        }
      }
    }
  }, []);

  const handleChange = async (e) => {
    var mensaje = "Se aplico el metodo de pago correctamente.";
    var tipo = "info";
    props.updateDetallePago(e.target.value);
    setSelectedOption(e.target.value);
    const myGrowl = await growl({
      type: tipo,
      title: "información",
      message: mensaje,
    });
  };

  return (
    <>
      <Col sm={12} md={3} xl={3}>
        <h6 className="titulo-detalle">Método de pago</h6>
      </Col>
      <Col sm={12} md={9} xl={9}>
        <Form.Check
          custom
          type="radio"
          label="Tarjeta de crédito/débito"
          name="group2"
          id="radio1"
          value="CRD"
          checked={selectedOption === "CRD"}
          disabled={parseInt(props.boton) === 1 ? false : true}
          onChange={handleChange}
        />
        <Collapse in={selectedOption === "CRD"}>
          <div
            id="example-collapse-text"
            className="descripcion-radio-dinamico"
          >
            El cobro se realizará en el momento de la entrega por medio de un
            POS inalámbrico, por lo que debes tener a la mano tu tarjeta de
            crédito.
          </div>
        </Collapse>
        <Form.Check
          custom
          type="radio"
          label="Efectivo"
          name="group2"
          id="radio2"
          value="EFE"
          disabled={parseInt(props.boton) === 1 ? false : true}
          checked={selectedOption === "EFE"}
          onChange={handleChange}
        />
      </Col>
    </>
  );
};
DetalleHistorial.defaultProps = {
  boton: 1,
  historial: {},
  updateDetallePago: () => {},
};
function mapDispatchToProps(dispatch) {
  return {
    updateDetallePago: (item) => dispatch(updateDetallePago(item)),
  };
}
function mapStateToProps(state, props) {
  return {
    detallePago: state.detallePago,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleHistorial);
