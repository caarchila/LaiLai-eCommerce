import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Col, Collapse } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { updatedetallepago } from "../../../actions/detallePagoActions";
import { growl } from "@crystallize/react-growl";

//TODO: se ha cambiado CRD (tarjeta) por MIP
const DetalleHistorial = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.detallepago);
  useEffect(() => {
    if (parseInt(props.boton) === 0) {
      if (props.historial.detallePago !== undefined) {
        if (props.historial.detallePago[0].formaPago.trim() === "EFE") {
          setSelectedOption("EFE");
        } else {
          setSelectedOption("MIP");
        }
      }
    }
  }, []);

  const handleChange = async (e) => {
    // var mensaje = "co el metodo de pago correctamente.";
    // var tipo = "info";
    props.updatedetallepago(e.target.value);
    setSelectedOption(e.target.value);

    // const myGrowl = await growl({
    //   type: tipo,
    //   title: "información",
    //   message: mensaje,
    // });
  };

  return (
    //TODO: se ha cambiado CRD por MIP
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
          value="MIP"
          checked={selectedOption === "MIP"}
          disabled={parseInt(props.boton) === 1 ? false : true}
          onChange={handleChange}
        />
        <Collapse in={selectedOption === "MIP"}>
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
        {props.boton !== "0" ? (
          props.detallepago === "" ? (
            <p className="error">Por favor, especificar un metodo de pago.</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Col>
    </>
  );
};
DetalleHistorial.defaultProps = {
  boton: 1,
  historial: {},
  updatedetallepago: () => {},
};
function mapDispatchToProps(dispatch) {
  return {
    updatedetallepago: (item) => dispatch(updatedetallepago(item)),
  };
}
function mapStateToProps(state, props) {
  return {
    detallepago: state.detallepago,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleHistorial);
