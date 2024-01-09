import React, { useId } from "react";
import "./style.css";
import axios from "axios";
import Tiendas from "../Tiendas";

class TiendasClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tiendas: [],
      tiendaSeleccionada: {},
    };
  }

  componentDidMount() {
    axios.get("/clientapp-web/webresources/tiendas/list").then((resp) => {
      this.setState({
        Tiendas: resp.data.tiendas,
      });
    });
  }

  render() {
    const tiendas = this.state.Tiendas;
    return (
      <>
        {tiendas.map((t) => {
          return (
            <Tiendas
              key={t.id}
              tiendas={t}
              marker={this.props.marker}
              mapa={this.props.mapa}
              nextstep={this.props.nextstep}
              tiendaSeleccionada={this.state.tiendaSeleccionada}
              getLocation={this.props.getLocation}
              getTiendaSeleccionada={(direccion) =>
                this.setState({ tiendaSeleccionada: direccion })
              }
              agregaralcarrito={this.props.agregaralcarrito}
            />
          );
        })}
      </>
    );
  }
}
TiendasClass.defaultProps = {
  getLocation: () => {},
  mapa: {},
  marker: {},
  nextstep: () => {},
  agregaralcarrito: () => {},
};
export default TiendasClass;
