import React from "react";
import FormularioRegistro from "./formularioregistrarme";
import Card from "react-bootstrap/Card";
import "./style.css";
const Registrarme = (props) => (
  <>
    <Card>
      <Card.Body>
        <Card.Text>
          <strong>información Personal.</strong>
        </Card.Text>
        <FormularioRegistro
          anyWhere={props.anyWhere}
          onHide={() => {
            props.onHide();
          }}
          agregaralcarrito={() => {
            props.agregaralcarrito();
          }}
        />
      </Card.Body>
    </Card>
  </>
);
Registrarme.defaultProps = {
  anyWhere: false,
  onHide: () => {},
  agregaralcarrito: () => {},
};

export default Registrarme;
