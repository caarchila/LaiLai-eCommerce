import React, { useState } from "react";
import { Form, Fade, Col, Row } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { updateDireccion } from "../../../actions/direccionActions";
import { updateOcasion } from "../../../actions/ocasionActions";
import { growl } from "@crystallize/react-growl";
import TooltipRadioDinamico from "../ToolTipRadioDinamico";
import useHorarioHome from '../../customHooks/useHorarioHome';
import {validarHorarioSeleccionado} from '../../../util/funciones';
const Radio = ({
  obj,
  value,
  setSelected,
  updateDireccion,
  updateOcasion,
  onShow,
  getDireccionSeleccionada,
  getDirecciones,
}) => {
  const horarioHabilHome = useHorarioHome(obj.longitud, obj.latitud);

  const updateSelecctedItem = async (e) => {
    var estado = true;
    var mensaje = "";
    var tipo = "";
    await horarioHabilHome.then(data=>{
      if(data.result !== "ACT"){
        estado = false;
        mensaje = "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
        tipo = "warning";
      }
    });

    if(estado){
      mensaje = "Se agrego la direccion correctamente";
      tipo = "info";
      setSelected(obj.id);
      updateDireccion(obj);
      updateOcasion("DOM");
    }
    const myGrowl = await growl({
      type: tipo,
      title: "información",
      message:mensaje,
      timeout: 2000,
    });

  };

  return (
    <div className="contenedor-radio-dinamico my-2">
      <Row>
        <Col sm={6} md={6} xl={6}>
          <Form.Check
            custom
            id={obj.id}
            type="radio"
            label={obj.nombre}
            name="direccion"
            value={obj.id}
            checked={obj.id === value}
            onChange={updateSelecctedItem}
          />
          <Fade in={obj.id === value}>
            <span className="descripcion-radio-dinamico">{obj.direccion}</span>
          </Fade>
        </Col>
        <Col sm={6} md={6} xl={6}>
          <TooltipRadioDinamico
            actualizarDirecciones={getDirecciones}
            direccion={obj}
            onShow={onShow}
            getDireccionSeleccionada={getDireccionSeleccionada}
          />
        </Col>
      </Row>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    updateDireccion: (item) => dispatch(updateDireccion(item)),
    updateOcasion: (item) => dispatch(updateOcasion(item)),
  };
}

export default connect(null, mapDispatchToProps)(Radio);
