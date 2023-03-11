import React from "react";
import { Modal, Button } from "react-bootstrap";
import CardDetalle from '../CardDetalle/CardDetalle';
import './styles.css';
class ModalEditarProducto extends React.Component {

  render() {
    return (
      <Modal
        size="xl"
        centered
        {...this.props}
        className="modal-editar-producto"
        dialogClassName="modal-90w"
        >

          <CardDetalle onHide={this.props.onHide} detalleMenu={this.props.detalleMenu} detalleSelected={this.props.detalleSelected} edi={"edi"}/>
        <Modal.Footer>
          <Button variant="danger" rounded onClick={this.props.onHide} id="btn-modal-editar-producto" className="btn-modal-editar-producto">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalEditarProducto;
