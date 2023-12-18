import React from "react";

//TODO: use horario futuro logs here
function useHorarioFuturo(horaApertura, horaCierre, fechaEntrega) {
  // console.log("fecha texto ", fechaEntrega);
  var estado = false;
  if (horaApertura !== undefined) {
    var _inicio = horaApertura.split(":").map((i) => Number(i));
    var _cierre = horaCierre.split(":").map((i) => Number(i));

    var entrega = new Date(fechaEntrega);
    // console.log("entrega", entrega);
    var horaInicio = new Date(entrega);
    horaInicio.setHours(_inicio[0], _inicio[1]);
    var HoraFin = new Date(entrega);
    HoraFin.setHours(
      _cierre[0] < 12 ? _cierre[0] + 12 : _cierre[0],
      _cierre[1]
    );
    // console.log("fin", HoraFin);
    // console.log("inicio", horaInicio);
    if (entrega >= horaInicio && entrega <= HoraFin) {
      estado = true;
    }
  }
  // console.log("estadodos", estado);
  return estado;
}

export default useHorarioFuturo;
