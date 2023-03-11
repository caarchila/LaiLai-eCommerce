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

const ModalidadEntrega = (props) => {
  const estado =
    Object.keys(props.direccion).length === 0 ||
    props.fechaEntrega === "" ||
    props.detallePago === ""
      ? false
      : true;
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
      <div className="contenedor-modal-delivery">
        <a.div
          className="c"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform,
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
                    props.openModalEditarDireccion();
                    props.onHide();
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
            transform: transform.interpolate((t) => `${t} rotatey(180deg)`),
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
        {
          (Object.keys(props.direccion).length > 0)?(<Button
              variant="outline-dark"
              className="btn-continuar"
              onClick={() => {
                setInicio(inicio + 180);
                setPaso(3);
                set((state) => !state);
              }}
            >
              <MDBIcon icon="arrow-right" />
            </Button>):''
        }
          <PickAndGo
            nextstep={() => {
              setPaso(3);
              setInicio(inicio + 180);
              set((state) => !state);
            }}
          />
        </a.div>
        <a.div
          className="mapaC"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform: transform.interpolate((t) => `${t} rotatey(360deg)`),
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
                    set((state) => !state);
                    setInicio(inicio + 180);
                    setPaso(2);
                  }}
                >
                  <MDBIcon icon="arrow-left" />
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
        </a.div>
      </div>
      {estado ? (
        <Button
          onClick={() => {
            props.agregarAlCarrito();
          }}
          size="lg"
          id="btn-danger"
        >
          Confirmar
        </Button>
      ) : (
        ""
      )}
    </>
  );
};
//definiendo valores por defecto de la modalidad.
ModalidadEntrega.defaultProps = {
  agregarAlCarrito: () => {},
  onHide: () => {},
  ocasion: "",
  openModalEditarDireccion: () => {},
};

function mapStateToProps(state, props) {
  return {
    ocasion: state.ocasion,
    direccion: state.direccion,
    fechaEntrega: state.fechaEntrega,
    detallePago: state.detallePago,
  };
}
export default connect(mapStateToProps, null)(withModal(ModalidadEntrega));
