import React, { useState, useEffect } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { updateDireccion } from "../../../actions/direccionActions";
import swal from "sweetalert";
import { MDBIcon } from "mdbreact";
import "./styles.css";

const TooltipRadioDinamico = ({
  estado,
  getDireccionSeleccionada,
  direccion,
  actualizarDirecciones,
  onShow,
  direccionSeleccionada,
  updateDireccion,
}) => {
  const editar = () => {
    getDireccionSeleccionada(direccion);
    onShow();
  };

  const eliminar = () => {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, No podras recuperar tu información!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (Object.keys(direccionSeleccionada).length !== 0) {
          if (direccionSeleccionada.id === direccion.id) {
            updateDireccion({});
          }
        }
        axios
          .get(`/clientapp-web/webresources/direccion/delete/${direccion.id}`)
          .then((resp) => {
            if (resp.data.result === true) {
              actualizarDirecciones();
              swal("Bien hecho!", `${resp.data.msg}`, "success");
            } else {
              swal("Ocurrio un error!", `${resp.data.msg}`, "error");
            }
          });
      } else {
        swal("Tu información esta segura!");
      }
    });
  };

  return (
    <>
      <Button
        variant={"warning"}
        className="my-2 boton-editar"
        onClick={editar}
      >
        <MDBIcon far icon="edit" />
      </Button>
      <Button variant={"danger"} className="boton-editar" onClick={eliminar}>
        <MDBIcon far icon="trash-alt" />
      </Button>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
  };
}

function mapStatetoProps(state, props) {
  return {
    direccionSeleccionada: state.direccion,
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(TooltipRadioDinamico);
