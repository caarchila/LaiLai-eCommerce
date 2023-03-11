import React, { useState } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";
import ContentMenus from "./ContentMenus/ContentMenus";
import Formulario from "./FormDetalleProducto/Formulario";
import { useSpring, animated } from "react-spring";
import "./styles.css";

const CardDetalle = ({ detalleMenu, detalleSelected, edi, onHide }) => {
  const [totalProducto, setTotalProducto] = useState(1);
  const [totalOpciones, setTotalOpciones] = useState(0.0);
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 40,
    1.1,
  ];
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const trans = (x, y, s) =>
    `perspective(700px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  return (
    <>
      <Card body className="p-3 content-card-detalle">
        <Row>
          <Col sm={12} md={6} xl={6}>
            <animated.div
              className="card-detalle d-flex justify-content-center"
              onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xys: calc(x, y) })
              }
              onMouseLeave={() => set({ xys: [0, 0, 1] })}
              style={{ transform: props.xys.interpolate(trans) }}
            >
              <Image
                src={
                  detalleMenu.imagenes !== undefined
                    ? detalleMenu.imagenes.normal === undefined
                      ? detalleMenu.imagenes.unavailable
                      : detalleMenu.imagenes.normal
                    : ""
                }
                fluid
                className="imagenCardDetalle"
              />
            </animated.div>
          </Col>
          <Col sm={12} md={6} xl={6}>
            <ContentMenus
              obj={detalleMenu}
              totalProducto={totalProducto}
              totalOpciones={totalOpciones}
            />
            <Formulario
              onHide={onHide}
              detalle={detalleMenu}
              getProductoTotal={setTotalProducto}
              getTotalOpciones={setTotalOpciones}
              edi={edi}
              detalleSelected={detalleSelected}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardDetalle;
