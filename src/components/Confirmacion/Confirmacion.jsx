import React, { useState } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import "./styles.css";
import imagenConfirmacion from "../../images/imagenConfirmacion.png";
import { connect } from "react-redux";
import { showModal } from "../../actions/modalActions";
import { Link } from "react-router-dom";

const Confirmacion = ({ mostrar, ocultar, showModal }) => {
  const [smShow, setSmShow] = useState(mostrar);
  const ocultarModal = () => {
    setSmShow(false);
    ocultar(false);
  };
  const abrirCarrito = () => {
    ocultarModal();
    showModal(true);
  };

  return (
    <Modal
      size="sm"
      centered
      show={smShow}
      onHide={ocultarModal}
      aria-labelledby="example-modal-sizes-title-sm"
      contentClassName="modal-content-confirmacion"
    >
      <Modal.Header closeButton>
        <Image className="imagenConfirmacion" src={imagenConfirmacion} fluid />
      </Modal.Header>
      <Modal.Body>
        ¡Tu orden se agregó
        <br />
        exitosamente al carrito!
      </Modal.Body>
      <Modal.Footer>
        <Button
          block
          variant="danger"
          id="btnIrAlCarrito"
          className="my-1"
          onClick={abrirCarrito}
        >
          Ir al carrito
        </Button>
        <Link to={"/"} className="link-navigation">
          <Button
            block
            variant="light"
            id="btnSeguirOrdenando"
            className="my-1"
            onClick={ocultarModal}
          >
            Seguir ordenando
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    showModal: (item) => dispatch(showModal(item)),
  };
}

export default connect(null, mapDispatchToProps)(Confirmacion);
