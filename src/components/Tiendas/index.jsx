import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { connect } from "react-redux";
import { growl } from "@crystallize/react-growl";
import { updateDireccion } from "../../actions/direccionActions";
import { updateocasion } from "../../actions/ocasionActions";
import useHorario from "../customHooks/useHorario";

const Tiendas = (props) => {
  const classActive =
    props.tiendas.id === props.tiendaSeleccionada.id ? "tiendas-active" : "";
  const horarioHabil = useHorario(
    props.tiendas.horaApertura,
    props.tiendas.horaCierre
  );
  const updateTienda = async (e) => {
    if (props.tiendas.longitud !== undefined) {
      props.marker.setLngLat([
        parseFloat(props.tiendas.longitud),
        parseFloat(props.tiendas.latitud),
      ]);
      props.mapa.flyTo({
        center: [
          parseFloat(props.tiendas.longitud),
          parseFloat(props.tiendas.latitud),
        ],
        essential: true,
        zoom: 15.99,
      });
    }
    if (horarioHabil) {
      props.getLocation(props.tiendas);
      props.updateDireccion(props.tiendas);
      props.getTiendaSeleccionada(props.tiendas);
      props.updateocasion("LLV");
      props.nextstep();
      const myGrowl = await growl({
        type: "info",
        title: "información",
        message: "Se cambio la dirección correctamente",
        timeout: 2000,
      });
      props.agregaralcarrito();
    } else {
      const myGrowl = await growl({
        type: "warning",
        title: "información",
        message:
          "No contamos con servicio a domilicio en este horario,te sugerimos programar la entrega.",
        timeout: 2000,
      });
    }
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    <>
      <Col md={6}>
        <div
          className={`tiendas ${classActive}`}
          onClick={!props.readOnly ? updateTienda : () => {}}
        >
          <h2 className={`titulo-tienda ${classActive}`}>
            {props.tiendas.nombre}
          </h2>
          <p className={`parrafo2-tienda ${classActive}`}>
            {props.tiendas.direccion}
          </p>
          <p className={`parrafo2-tienda ${classActive}`}>
            Hora apertura: {props.tiendas.horaApertura}
          </p>
          <p className={`parrafo2-tienda ${classActive}`}>
            Hora cierre: {props.tiendas.horaCierre}
          </p>
        </div>
      </Col>
    </>
  );
};
Tiendas.defaultProps = {
  tiendas: {},
  tiendaSeleccionada: {},
  readOnly: false,
  getLocation: (obj) => {},
  mapa: {},
  marker: {},
  nextstep: () => {},
};

function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
    updateocasion: (item) => dispatch(updateocasion(item)),
  };
}

export default connect(null, mapDispatchToProps)(Tiendas);
