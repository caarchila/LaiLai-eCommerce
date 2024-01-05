import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Group from "../../images/Group.svg";
import Vector from "../../images/Vector.svg";
import seleccionadaDom from "../../images/amarilla.svg";
import seleccionadaLLV from "../../images/amarilla2.svg";
import withModal from "../HOC/withModal";
import { connect } from "react-redux";
import PickAndGo from "../pickandgo";
import { useSpring, animated as a } from "react-spring";
import { MDBIcon } from "mdbreact";
import DetalleMetodoPago from "../SeccionDatosPersonales/DetalleMetodoPago";
import ProgramarEntrega from "../SeccionDatosPersonales/ProgramarEntrega";
import "./index.css";

import { updateocasion } from "../../actions/ocasionActions";

const ModalidadEntrega = (props) => {
  /*
  TODO: since fecha entrega en detallepago are not used any more i remove this on const estado:
  ||
    props.fechaentrega === "" ||
    props.detallepago === ""
  */
  const estado = Object.keys(props.direccion).length === 0 ? false : true;
  const [inicio, setInicio] = useState(0);
  const [flipped, set] = useState(false);
  const [paso, setPaso] = useState(
    Object.keys(props.direccion).length > 0 ? 3 : 1
  );

  const { transform, opacity, display } = useSpring({
    opacity: flipped ? 1 : 0,
    display: paso === 1 ? "block" : "none",
    transform: `perspective(600px) rotatey(${inicio}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <>
      <div className="contenedor-modal-delivery modal-pick-and-go">
        {console.log("length", Object.keys(props.direccion).length === 0)}
        <a.div
          className="c"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform:
              props.ocasion === "" && paso === 1
                ? transform.interpolate((t) => `${t} rotatey(0deg)`)
                : props.ocasion === "LLV"
                ? transform.interpolate(
                    (t) => `${t} rotatey(${inicio - 360}deg)`
                  ) // 0
                : transform.interpolate((t) => `${t} rotatey(${inicio}deg)`), //180

            display: paso === 1 ? "block" : "none",
          }}
        >
          <div>
            <h1>
              <strong>Escoge tu modalidad de entrega</strong>
            </h1>
          </div>
          <p className="escoger">
            Escoge de que forma deseas la entrega de tu pedido.
          </p>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <img
                  src={props.ocasion === "DOM" ? seleccionadaDom : Vector}
                  className="my-3"
                />
                <Button
                  onClick={() => {
                    props.agregaralcarritoopenmodaleditardireccion();
                    props.onHide();
                    props.updateocasion("DOM");
                  }}
                  className={`btn-block`}
                  id="btn-danger"
                >
                  Delivery
                </Button>
                <p className="my-1 delivery">*Servicio a domicilio</p>
              </Col>
              <Col xs={12} md={6}>
                <img
                  src={props.ocasion === "LLV" ? seleccionadaLLV : Group}
                  className="my-3"
                />
                <Button
                  className={`btn-block`}
                  id="btn-danger"
                  onClick={() => {
                    setPaso(2);
                    setInicio(inicio + 180);
                    set((state) => !state);
                    props.updateocasion("LLV");
                  }}
                >
                  Pick and Go
                </Button>
                <p className="my-1 recoger">*Recoger en restaurante</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} md={12}>
                <p className="parrafosModal">
                  Cuéntanos algunos detalles sobre dónde deseas tu orden para
                  verificar que nuestro servicio está disponible para atenderte
                  como te mereces.
                </p>
              </Col>
            </Row>
          </Container>
        </a.div>
        <a.div
          className="mapaC"
          style={{
            opacity: opacity,
            //TODO: flipped
            transform:
              paso === 2
                ? transform.interpolate((t) => {
                    return `${t} rotatey(${inicio}deg)`;
                  }) //180
                : transform.interpolate(
                    (t) => `${t} rotatey(${inicio - 180}deg)`
                  ), ///0
            display: paso === 2 ? "block" : "none",
          }}
        >
          <Button
            variant="outline-dark"
            className="btn-volver"
            onClick={() => {
              setInicio(inicio + 180);
              setPaso(1);
              set((state) => !state);
            }}
          >
            <MDBIcon icon="arrow-left" />
          </Button>
          {/* TODO: force this element to not be displayed 
              Object.keys(props.direccion).length > 0 
           */}
          {false ? (
            <Button
              variant="outline-dark"
              className="btn-continuar"
              onClick={() => {
                setInicio(inicio + 180);
                set((state) => !state);
                props.updatepedidofuturo("N");
                props.updateocasion("");
                props.agregaralcarrito();
                props.onHide();
              }}
            >
              <MDBIcon icon="arrow-right" />
            </Button>
          ) : (
            ""
          )}
          <PickAndGo
            agregaralcarrito={props.agregaralcarrito}
            nextstep={() => {
              // setPaso(3);
              // setInicio(inicio + 180);
              // set((state) => !state);
              // props.agregaralcarrito();
              // props.onHide();
            }}
            showSaveButton={true}
          />
        </a.div>
        {/* TODO: here commented third step */}
        {/* <a.div
          className="mapaC"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform:
              paso === 3
                ? transform.interpolate((t) => `${t} rotatey(${inicio - 0}deg)`) //0
                : transform.interpolate(
                    (t) => `${t} rotatey(${inicio - 180}deg)`
                  ), //180
            display: paso === 3 ? "block" : "none",
          }}
        >
          <Container>
            <Row className="text-center my-2">
              <Col sm={2}>
                <Button
                  variant="outline-dark"
                  className="btn-volver"
                  onClick={() => {
                    if (props.ocasion === "DOM") {
                      //TODO: fix this
                      setInicio(inicio + 180);
                      setPaso(1);
                      set((state) => state);
                    } else {
                      setInicio(inicio + 180);
                      setPaso(2);
                      set((state) => !state);
                    }
                  }}
                >
                  <MDBIcon icon="arrow-left" /> 2
                </Button>
              </Col>
              <Col sm={10}>
                <h1>
                  <strong>Datos adicionales.</strong>
                </h1>
              </Col>
            </Row>
            <Row className="metodo-pago-modalidad-entrega">
              <DetalleMetodoPago />
            </Row>
            <hr />
            <Row className="text-left">
              <ProgramarEntrega />
            </Row>
          </Container>
        </a.div> */}
      </div>
      {/* {estado ? (
        <Button
          onClick={() => {
            props.agregaralcarrito();
          }}
          size="lg"
          id="btn-danger"
        >
          Confirmar
        </Button>
      ) : (
        ""
      )} */}
    </>
  );
};
//definiendo valores por defecto de la modalidad.
ModalidadEntrega.defaultProps = {
  agregaralcarrito: () => {},
  onHide: () => {},
  ocasion: "",
  agregaralcarritoopenmodaleditardireccion: () => {},
};

function mapStateToProps(state, props) {
  return {
    ocasion: state.ocasion,
    direccion: state.direccion,
    fechaentrega: state.fechaentrega,
    detallepago: state.detallepago,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateocasion: (item) => {
      dispatch(updateocasion(item));
    },
    updatepedidofuturo: (item) => dispatch(updateocasion(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withModal(ModalidadEntrega));
