import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { connect } from "react-redux";
import { growl } from "@crystallize/react-growl";
import { updateDireccion } from "../../actions/direccionActions";
import { updateocasion } from "../../actions/ocasionActions";

const Tiendas = (props) => {
  const classActive =
    props.tiendas.id === props.tiendaSeleccionada.id ? "tiendas-active" : "";
  const updateTienda = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    props.getTiendaSeleccionada(props.tiendas);
    props.updateDireccion(props.tiendas);

    //TODO: commented this direccion change
    // const myGrowl = await growl({
    //   type: "info",
    //   title: "información",
    //   message: "Se cambio la dirección correctamente",
    //   timeout: 2000,
    // });
    props.updateocasion("LLV");
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
          </div>
        </Col>
      </>
    );
  };
};
Tiendas.defaultProps = {
  tiendas: {},
  tiendaSeleccionada: {},
  getTiendaSeleccionada: () => {},
  readOnly: false,
  getLocation: () => {},
  mapa: {},
  marker: {},
};

function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
    updateocasion: (item) => dispatch(updateocasion(item)),
  };
}

export default connect(null, mapDispatchToProps)(Tiendas);
