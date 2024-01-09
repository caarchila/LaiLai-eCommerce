import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
const MisOrdenes = ({ id, titulo, fecha, hora, totalOrden }) => (
  <>
    <Col sm={6} md={6} xl={6} className="my-2">
      <Link to={`/detalleOrden/${id}/0`} className="text-dark">
        <Card className="ordenesMios">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Text>
                  <strong>Orden No: {id}</strong>
                </Card.Text>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                  <strong>Fecha/Hora: </strong>
                  {fecha} {hora}{" "}
                </Card.Text>
              </div>
              <div>
                <Badge variant="warning">
                  Q.{parseFloat(totalOrden).toFixed(2)}
                </Badge>
              </div>
            </div>
            <Button variant="danger" className="d-block boton-ver-detalle">
              Ver detalle de orden
            </Button>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  </>
);

export default MisOrdenes;
