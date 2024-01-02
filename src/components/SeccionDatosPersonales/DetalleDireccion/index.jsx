import React, { useState } from "react";
import { Col, Collapse, Form, Row } from "react-bootstrap";
import "./styles.css";
import { MDBIcon } from "mdbreact";
import ModalEditarDireccion from "../../ModalEditarDireccion";
import { connect } from "react-redux";
import Tienda from "../../Tiendas";
import ModalPickAndGo from "../../ModalPickAndGo";
import { updateocasion } from "../../../actions/ocasionActions";
import { updateDireccion } from "../../../actions/direccionActions";

const DetalleDireccion = ({
  historial,
  boton,
  direccion,
  ocasion,
  updateDireccion,
  updateocasion,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [showModalPick, setShowModalPick] = useState(false);
  const [ocasionDom, setOcasionDom] = useState(
    parseInt(boton) === 1 ? ocasion : historial.ocasion
  );

  const direccionDom =
    ocasion === "DOM"
      ? Object.keys(direccion).length > 0 && parseInt(boton) === 1
        ? direccion
        : historial.tienda
      : {};

  const direccionLlv =
    ocasion === "LLV"
      ? Object.keys(direccion).length > 0 && parseInt(boton) === 1
        ? direccion
        : historial.tienda
      : {};

  const handleChange = (e) => {
    setOcasionDom(e.target.value);
    updateDireccion("");
    updateocasion(e.target.value);
  };
  return (
    <>
      <ModalEditarDireccion
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        onAccept={() => setModalShow(false)}
      />
      <ModalPickAndGo
        show={showModalPick}
        onHide={() => {
          setShowModalPick(false);
        }}
        size={ "lg" }
      />
      <Col sm={12} md={3} xl={3}>
        <h6 className="titulo-detalle">Dirección de envio</h6>
      </Col>
      <Col sm={12} md={8} xl={8}>
        <Form.Check
          custom
          type="radio"
          label="Pick up"
          name="grupoOca"
          id="ocasion1"
          value="LLV"
          disabled={parseInt(boton) === 1 ? false : true}
          checked={ocasionDom === "LLV"}
          onChange={handleChange}
          aria-controls="collapse-llv"
          aria-expanded={ocasionDom === "LLV"}
        />
        <Collapse in={ocasionDom === "LLV"}>
          <div id="collapse-llv">
            <Row>
              {direccionLlv !== undefined &&
              Object.keys(direccionLlv).length > 0 ? (
                <Tienda readOnly={true} tiendas={direccionLlv} />
              ) : (
                <Col md={6}>
                  <p className="contenido-detalle-direccion">
                    Seleccione una tienda.
                  </p>
                </Col>
              )}

              <Col sm={12} md={1} xl={1}>
                {parseInt(boton) === 0 ? (
                  ""
                ) : (
                  <button
                    className="text-white rounded boton-editar text-center"
                    onClick={() => {
                      setShowModalPick(true);
                    }}
                  >
                    <MDBIcon far icon="edit" />
                  </button>
                )}
              </Col>
            </Row>
          </div>
        </Collapse>
        <Form.Check
          custom
          type="radio"
          label="Delivery"
          name="grupoOca"
          id="ocasion2"
          value="DOM"
          disabled={parseInt(boton) === 1 ? false : true}
          checked={ocasionDom === "DOM"}
          onChange={handleChange}
          aria-controls="collapse-dom"
          aria-expanded={ocasionDom === "DOM"}
        />
        <Collapse in={ocasionDom === "DOM"}>
          <div id="collapse-dom">
            <Row>
              <Col sm={12} md={8} xl={8}>
                <h6>
                  <strong>
                    {direccionDom !== undefined ? direccionDom.nombre : ""}
                  </strong>
                </h6>
                <p className="contenido-detalle-direccion">
                  {direccionDom !== undefined
                    ? Object.keys(direccionDom).length > 0
                      ? direccionDom.direccion
                      : "Seleccione una dirección"
                    : "Seleccione una dirección"}
                </p>
              </Col>
              <Col sm={12} md={1} xl={1}>
                {parseInt(boton) === 0 ? (
                  ""
                ) : (
                  <button
                    className="text-white rounded boton-editar text-center"
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    <MDBIcon far icon="edit" />
                  </button>
                )}
              </Col>
            </Row>
          </div>
        </Collapse>
        {direccion === "" || ocasion === "" ? (
          <p className="error">
            Por favor, especificar una dirección y tipo de entrega.
          </p>
        ) : (
          <></>
        )}
      </Col>
    </>
  );
};
function mapStateToProps(state, props) {
  return {
    direccion: state.direccion,
    ocasion: state.ocasion,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
    updateocasion: (item) => dispatch(updateocasion(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleDireccion);
