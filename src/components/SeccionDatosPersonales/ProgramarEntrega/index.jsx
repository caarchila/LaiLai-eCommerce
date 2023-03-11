import 'date-fns';
import React, { useState, useEffect } from "react";
import { Col, Collapse, Form } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import useHorario from '../../customHooks/useHorario';
import useHorarioHome from '../../customHooks/useHorarioHome';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import red  from "@material-ui/core/colors/red";
import {
DateTimePicker,
MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { updateFechaEntrega } from '../../../actions/fechaEntregaActions';
import { updatePedidoFuturo } from '../../../actions/pedidoFuturoActions';

const DetalleProgramarEntrega = props => {
  const horarioHabil = useHorario(props.direccion.horaApertura,props.direccion.horaCierre);
  const horarioHabilHome = useHorarioHome(props.direccion.longitud, props.direccion.latitud);
  const [entrega, setEntrega] = useState("");
  const [habilitar, setHabilitar] = useState(true);
  const materialTheme = createMuiTheme({
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
    MuiPickersModal: {
      dialogAction: {
        color: red["400"],
      },
    },
  },
});
  const handleChange = (e) => {
    setEntrega(e.target.value);
    if(e.target.value === "EI"){
    if(props.ocasion === "LLV"){
      if(horarioHabil){
        let fecha = new Date();
        fecha.setMinutes(fecha.getMinutes() + 45);
        props.updateFechaEntrega(fecha);
      }else{
        setEntrega("");
        setHabilitar(false);
      }
    }else{
      horarioHabilHome.then(data=>{
        if(data.result === "ACT"){

            let fecha = new Date();
            fecha.setMinutes(fecha.getMinutes() + 45);
            props.updateFechaEntrega(fecha);
            setHabilitar(true);
          }else{
            setEntrega("");
            setHabilitar(false);
          }
      })
    }
    }else{
      let fechaFin = new Date(fechaProgramada);
      props.updateFechaEntrega(fechaFin);
      props.updatePedidoFuturo("S");
    }
  };
  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0,16);
  const [fechaProgramada, setFechaProgramada] = useState((props.fechaEntrega !== "")?props.fechaEntrega:today);
  const getFecha = (date) => {
      setFechaProgramada(date);
      let fecha = new Date(date);
      let fechaFin = fecha;
      props.updateFechaEntrega(fechaFin);
      props.updatePedidoFuturo("S");
  }



  useEffect(()=>{
    if(parseInt(props.boton) === 1){
      setEntrega("EI");
      if(props.ocasion === "LLV"){
        if(horarioHabil){
          let fecha = new Date();
          fecha.setMinutes(fecha.getMinutes() + 45);
          props.updateFechaEntrega(fecha);
          setHabilitar(true);
        }else{
          setEntrega("");
          setHabilitar(false);
        }
      }else{
      horarioHabilHome.then(data=>{
        if(data.result === "ACT"){
            let fecha = new Date();
            fecha.setMinutes(fecha.getMinutes() + 45);
            props.updateFechaEntrega(fecha);
            setHabilitar(true);
          }else{
            setEntrega("");
            setHabilitar(false);
          }
      })
      }
    }
  },[])

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
          disabled={parseInt(props.boton) === 1 && habilitar? false : true}
          checked={entrega === "EI"}
          onChange={handleChange}
          aria-controls="collapse-EI"
          aria-expanded={entrega === "EI"}
        />
        <Collapse in={entrega === "EI"}>
          <div id="collapse-EI">
              <p className="contenido-detalle-programar-entrega"><strong>Tiempo de entrega aproximado: 45 minutos</strong></p>
          </div>
        </Collapse>
          {
            (!habilitar)?<p className="contenido-detalle-programar-entrega"><strong>No contamos con servicio a domilicio en este horario,
                  te sugerimos programar la entrega.</strong></p>:''
          }
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
               keyboardbuttonprops={{
                 'aria-label': 'change date',
               }}
             />
   </ThemeProvider>
               </MuiPickersUtilsProvider>
          </div>
        </Collapse>
      </Col>
    </>
  );
};
function mapStateToProps(state, props) {
  return {
    direccion: state.direccion,
    ocasion: state.ocasion,
    fechaEntrega:state.fechaEntrega
  };
}
function mapDispatchToProps(dispatch){
  return {
    updateFechaEntrega: (item) => dispatch(updateFechaEntrega(item)),
    updatePedidoFuturo: (item) => dispatch(updatePedidoFuturo(item))
  }
}
DetalleProgramarEntrega.defaultProps = {
  boton:1
}
export default connect(mapStateToProps, mapDispatchToProps)(DetalleProgramarEntrega);
