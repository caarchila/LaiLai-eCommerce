import "date-fns";
import React, { useState, useEffect } from "react";
import { Col, Collapse, Form } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import useHorario from "../../customHooks/useHorario";
import useHorarioFuturo from "../../customHooks/useHorarioFuturo";
import useHorarioHome from "../../customHooks/useHorarioHome";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { updatefechaentrega } from "../../../actions/fechaEntregaActions";
import { updatepedidofuturo } from "../../../actions/pedidoFuturoActions";
import { DateFormatter } from "../../../util/funciones";

const DetalleProgramarEntrega = (props) => {
  console.log("props", props);
  const horarioHabil = useHorario(
    props.direccion.horaApertura,
    props.direccion.horaCierre
  );
  const horarioHabilFuturo = useHorarioFuturo(
    props.direccion.horaApertura,
    props.direccion.horaCierre,
    props.fechaentrega
  );
  const horarioHabilHome = useHorarioHome(
    props.direccion.longitud,
    props.direccion.latitud
  );
  const [entrega, setEntrega] = useState("");
  const [habilitar, setHabilitar] = useState(true);
  const materialTheme = createTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: red.A200,
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: red.A200,
          color: "white",
        },
      },
      MuiPickersDay: {
        day: {
          color: red.A700,
        },
        daySelected: {
          backgroundColor: red["400"],
        },
        dayDisabled: {
          color: red["100"],
        },
        current: {
          color: red["900"],
        },
      },
    },
  });
  const handleChange = (e) => {
    setEntrega(e.target.value);
    if (e.target.value === "EI") {
      //TODO: pedido futuro no
      props.updatepedidofuturo("N");
      if (props.ocasion === "LLV") {
        //TODO: horario habil change here
        //TODO: change validation always be validate to select
        if (horarioHabil) {
          props.updatepedidofuturo("N");
          let fecha = new Date();
          fecha.setMinutes(fecha.getMinutes() + 45);
          props.updatefechaentrega(fecha);
          //TODO: seleccionar pick up y entrega inmediata genera nueva fecha + 45
        } else {
          setEntrega("");
          setHabilitar(false);
        }
      } else {
        horarioHabilHome.then((data) => {
          if (data.result === "ACT") {
            let fecha = new Date();
            //TODO: le sume 50 en lugar de 45 por el tiempo de espera
            fecha.setMinutes(fecha.getMinutes() + 50);
            props.updatefechaentrega(fecha);
            setHabilitar(true);
          } else {
            setEntrega("");
            setHabilitar(false);
          }
        });
      }
    } else {
      if (props.ocasion === "LLV") {
        //TODO: horario habil change here
        if (horarioHabil) {
          let fechaFin = new Date(fechaProgramada);
          props.updatefechaentrega(fechaFin);
          props.updatepedidofuturo("S");
          setHabilitar(true);
        } else {
          setEntrega("");
          setHabilitar(false);
        }
      } else {
        horarioHabilHome.then((data) => {
          if (data.result === "ACT") {
            let fechaFin = new Date(fechaProgramada);
            props.updatefechaentrega(fechaFin);
            props.updatepedidofuturo("S");
            setHabilitar(true);
          } else {
            setEntrega("");
            setHabilitar(false);
          }
        });
      }
    }
  };
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 16);
  const [fechaProgramada, setFechaProgramada] = useState(
    props.fechaentrega !== "" ? props.fechaentrega : today
  );
  const getFecha = (date) => {
    setFechaProgramada(date);
    let fechaFin = DateFormatter(date);
    props.updatefechaentrega(fechaFin);
    props.updatepedidofuturo("S");
  };

  useEffect(() => {
    // //si pedido futuro está declarado significa que no tiene que volver a validar horarios si no solo asignar el valor ya guardado
    // if (props.pedidoFuturo) {
    //   //TODO: validar para pedido futuro o PI la hora
    //   if (props.pedidoFuturo === "S") {
    //     //TODO: not sure on this
    //     if (!horarioHabilFuturo) {
    //       setEntrega("");
    //       setHabilitar(false);
    //     }
    //     setEntrega("PI");
    //   } else if (props.pedidoFuturo === "N") setEntrega("EI");
    // } else
    // if (parseInt(props.boton) === 1) {
    //   // setEntrega("EI");
    //   // setEntrega("");
    //   // props.updatefechaentrega(null);
    //   if (props.ocasion === "LLV") {
    //     if (horarioHabil) {
    //       let fecha = new Date();
    //       fecha.setMinutes(fecha.getMinutes() + 45);
    //       props.updatefechaentrega(fecha);
    //       setHabilitar(true);
    //     } else {
    //       setEntrega("");
    //       setHabilitar(false);
    //     }
    //   } else {
    //     horarioHabilHome.then((data) => {
    //       if (data.result === "ACT") {
    //         let fecha = new Date();
    //         fecha.setMinutes(fecha.getMinutes() + 45);
    //         props.updatefechaentrega(fecha);
    //         setHabilitar(true);
    //       } else {
    //         setEntrega("");
    //         setHabilitar(false);
    //       }
    //     });
    //   }
    // }

    if (props.boton !== "0") {
      setEntrega("");
      props.updatefechaentrega("");
    } else {
      if (props.historial.PedidoFuturo === "N") setEntrega("EI");
      else setEntrega("PI");
    }
  }, []);

  //useEffect utilizado para habilitar y deshabilitar pedido inmediato cuando no se ha seleccionado una dirección
  useEffect(() => {
    if (props.direccion !== "" && props.ocasion !== "") setHabilitar(true);
    else setHabilitar(false);
  }, [props.direccion]);

  return (
    <>
      <Col sm={12} md={3} xl={3}>
        <h6 className="titulo-detalle">Programar entrega</h6>
      </Col>
      <Col sm={12} md={8} xl={8}>
        <Form.Check
          custom
          type="radio"
          label="Entrega inmediata"
          name="grupoP"
          id="programar1"
          value="EI"
          disabled={parseInt(props.boton) === 1 && habilitar ? false : true}
          checked={entrega === "EI"}
          onChange={handleChange}
          aria-controls="collapse-EI"
          aria-expanded={entrega === "EI"}
        />
        <Collapse in={entrega === "EI"}>
          <div id="collapse-EI">
            <p className="contenido-detalle-programar-entrega">
              <strong>Tiempo de entrega aproximado: 45 minutos</strong>
            </p>
          </div>
        </Collapse>
        {!habilitar ? (
          <p className="contenido-detalle-programar-entrega">
            <strong>
              No contamos con servicio a domilicio en este horario, te sugerimos
              programar la entrega.
            </strong>
          </p>
        ) : (
          ""
        )}
        <Form.Check
          custom
          type="radio"
          label="Programar entrega"
          name="grupoP"
          id="programa2"
          value="PI"
          disabled={parseInt(props.boton) === 1 ? false : true}
          checked={entrega === "PI"}
          onChange={handleChange}
          aria-controls="collapse-PI"
          aria-expanded={entrega === "PI"}
        />
        <Collapse in={entrega === "PI"}>
          <div id="collapse-PI">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DateTimePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha y hora"
                  format="yyyy/MM/dd HH:mm a"
                  value={fechaProgramada}
                  onChange={getFecha}
                  minDate={today}
                  maxDate={today}
                  keyboardbuttonprops={{
                    "aria-label": "change date",
                  }}
                  disabled={props.boton === "0" ? true : false}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
        </Collapse>
        {props.boton !== "0" ? (
          props.fechaentrega === "" || props.fechaentrega === null ? (
            <p className="error">Por favor, especificar datos de orden.</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Col>
    </>
  );
};
function mapStateToProps(state, props) {
  return {
    direccion: state.direccion,
    ocasion: state.ocasion,
    fechaentrega: state.fechaentrega,
    pedidoFuturo: state.pedidoFuturo,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updatefechaentrega: (item) => {
      dispatch(updatefechaentrega(item));
    },
    updatepedidofuturo: (item) => dispatch(updatepedidofuturo(item)),
  };
}
DetalleProgramarEntrega.defaultProps = {
  boton: 1,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetalleProgramarEntrega);
