import React from 'react';
import {Modal,Button} from 'react-bootstrap';

const withModal = (WrappedComponent) =>{
  return class WithLoader extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      return(
      <Modal
        centered
        {...this.props}
      >
        <Modal.Header closeButton>
          <Modal.Title id="titulos">{this.props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <WrappedComponent {...this.props} />
        </Modal.Body>
        <Modal.Footer>
          {
            (this.props.button === true)
            ?
            <Button variant="danger" className="sesion"  onClick={this.props.onHide}>
              Close
            </Button>
            :
            ''
          }
        </Modal.Footer>
      </Modal>
    )
    }
  }
}
withModal.defaultProps = {
  titulo: "",
  button:true
}

export default withModal;
