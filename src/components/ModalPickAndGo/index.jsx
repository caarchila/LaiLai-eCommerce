import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PickAndGo from '../pickandgo';

class ModalPickAndGo extends React.Component{

render(){
  return(
    <Modal
      centered
      {...this.props}
      >

        <PickAndGo />
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide} id="btn-modal-editar-producto" className="btn-modal-editar-producto">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
  }
}

export default ModalPickAndGo;
