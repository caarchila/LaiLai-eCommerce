import React from "react";
import { Modal, Button } from "react-bootstrap";

const withModal = (WrappedComponent) => {
  return class WithLoader extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      {
        console.log("props with modal", this.props);
      }
      return (
        <Modal
          centered
          show={this.props.show}
          size={this.props.size}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="titulos">{this.props.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WrappedComponent {...this.props} />
          </Modal.Body>
          <Modal.Footer>
            {this.props.button === true ? (
              <Button
                variant="danger"
                className="sesion"
                onClick={this.props.onHide}
              >
                Close
              </Button>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>
      );
    }
  };
};
withModal.defaultProps = {
  titulo: "",
  button: true,
};

export default withModal;
