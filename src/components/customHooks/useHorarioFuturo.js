import React from "react";

//TODO: use horario futuro logs here
function useHorarioFuturo(horaApertura, horaCierre, fechaentrega) {
  const result = { error: "", estado: false };
  if (
    horaApertura === undefined ||
    horaCierre === undefined ||
    fechaentrega === undefined ||
    horaApertura === "" ||
    horaCierre === "" ||
    fechaentrega === ""
  ) {
    return result;
  }
  var _inicio = horaApertura.split(":").map((i) => Number(i));
  var _cierre = horaCierre.split(":").map((i) => Number(i));

  var entrega = new Date(fechaentrega);
  var horaInicio = new Date();
  horaInicio.setHours(_inicio[0], _inicio[1]);
  var HoraFin = new Date();
  HoraFin.setHours(_cierre[0] < 12 ? _cierre[0] + 12 : _cierre[0], _cierre[1]);
  HoraFin.setHours(HoraFin.getHours() - 1);

  const horaActual = new Date();
  const resultado = entrega.getTime() - horaActual.getTime();

  if (entrega >= horaInicio && entrega <= HoraFin) {
    result.estado = true;
  } else {
    result.estado = false;
    result.error =
      "Restaurante cerrado, recuerda pedir entre las " +
      horaApertura +
      " - " +
      HoraFin.getHours() +
      ":" +
      HoraFin.getMinutes().toString().padStart(2, "0");
    return result;
  }
  if (resultado < 36000) {
    result.estado = false;
    result.error =
      "Hora invalida, la hora debe de ser después de " +
      (new Date().getHours() + 1) +
      ":" +
      new Date().getMinutes().toString().padStart(2, "0");
  }

  return result;
}

export default useHorarioFuturo;
