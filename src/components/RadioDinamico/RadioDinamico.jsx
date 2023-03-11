import React, { useState } from "react";
import Radio from "./Radio/Radio";
import "./styles.css";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";

const RadioDinamico = ({
  direccion,
  direcciones,
  onShow,
  getDireccionSeleccionada,
  actualizarDirecciones,
  emptyPromise
}) => {
  const [selectedItem, setSelectedItem] = useState(direccion.id);
  return (
    <div className="contenedor-radios text-left">
      {direcciones.length > 0 ? (
        direcciones.map((d) => (
          <Radio
            key={d.id}
            setSelected={setSelectedItem}
            getDirecciones={actualizarDirecciones}
            getDireccionSeleccionada={getDireccionSeleccionada}
            value={selectedItem}
            obj={d}
            onShow={onShow}
          />
        ))
      ) : (emptyPromise)?(
        <Spinner animation="border" />
      ):"No hay resultados..."}
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    direccion: state.direccion,
  };
}

export default connect(mapStateToProps, null)(RadioDinamico);
