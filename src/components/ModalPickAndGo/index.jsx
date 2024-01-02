import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PickAndGo from '../pickandgo';
import "./style.css";
class ModalPickAndGo extends React.Component{

render(){
  console.log(this.props);
  return(
    <Modal
      centered
      {...this.props}
      className='modal-pick-and-go'
      >
      <Modal.Body >
        <PickAndGo />
      </Modal.Body>
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
