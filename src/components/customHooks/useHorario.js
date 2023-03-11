import React from 'react';
function useHorario(horaApertura,horaCierre){
    var estado = false;
    if(horaApertura !== undefined){
  var  horaapertura = horaApertura.split(":").map(i=>Number(i));
  var horaA  = horaapertura;

  var  horacierre = horaCierre.split(":").map(i=>Number(i));
  var horaC  = horacierre;


  var HoraActual = new Date();
  var horaInicio = new Date();
  horaInicio.setHours(horaA.[0],horaA.[1]);
  var HoraFin = new Date();
  HoraFin.setHours((horaC[0] < 12) ? horaC[0]+12 : horaC[0], horaC[1]);

      if(HoraActual >= horaInicio && HoraActual <= HoraFin ){
        estado = true;
      }
    }
  return estado;
}

export default useHorario;
