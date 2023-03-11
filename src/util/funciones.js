export function generarId(arreglo){
    let id = 1;
    if(arreglo.length > 0){
      let mayor = id;
      for (var i = 0; i < arreglo.length; i++) {
        if(arreglo[i].id > mayor ){
          mayor = arreglo[i].id;
        }
      };
      id = mayor + 1;
    }
    return id;
  }

export function ultimaDireccion(arreglo){
  let ultimaDireccion = {};
  if(arreglo.length> 0){
    ultimaDireccion = arreglo[0];
  }
  arreglo.map(d=>{
      if(d.id > ultimaDireccion.id){
        ultimaDireccion = d;
      }
  });
  return ultimaDireccion;
}

export function comprobarSession(user){
  let loggedIn = true;
  if(Object.keys(user).length === 0){
    loggedIn = false;
  }
  return loggedIn;
}

export function transformarFecha(pfecha){
  let fecha = new Date(pfecha);
  let fechaFinal =  ((fecha.getDate()) < 10?"0"+(fecha.getDate()):(fecha.getDate())) +"/"+ ((fecha.getMonth() + 1) < 10?"0"+(fecha.getMonth() + 1):(fecha.getMonth() + 1)) +"/"+ fecha.getFullYear() + " " + ((fecha.getHours() < 10)?"0"+fecha.getHours():fecha.getHours()) + ":" + ((fecha.getMinutes() < 10)?"0"+fecha.getMinutes():fecha.getMinutes());
     return fechaFinal;
}

export function  validarHorarioSeleccionado(horaProgramada,horaApertura, horaCierre){
  let respuesta = {estado:false, msj:""};
  //hora y fecha programada seleccionada
  let horaProgramadaFin = horaProgramada.toString().substring(16,21).split(":").map(i=>Number(i));
  let fechaProgramadaFin = new Date(horaProgramada);
  fechaProgramadaFin.setHours(0,0,0);

  if(horaApertura !== undefined){
    //hora de apertura tienda
    var  horaapertura = horaApertura.split(":").map(i=>Number(i));
    var horaA  = horaapertura;
    //hora de cierre de la tienda
    var  horacierre = horaCierre.split(":").map(i=>Number(i));
    var horaC  = horacierre;

    //fecha y hora actual tipo fecha
    var horaActual = new Date();
    //fecha con hora cero para comparar con fecha programada
    var fechaActual = new Date();
    fechaActual.setHours(0,0,0);
    //hora proagramadaDate para comprarar con hora actual y con rango de horas de la tienda
    var horaProgramadaDate = new Date();
    horaProgramadaDate.setHours(horaProgramadaFin.[0],horaProgramadaFin.[1]);
    //hora de apertura tienda con su tiempo de tipo fecha
    var horaInicio = new Date();
    horaInicio.setHours(horaA.[0],horaA.[1]);

    //hora de cierre de la tienda con su tiempo de tipo fecha
    var HoraFin = new Date();
    HoraFin.setHours((horaC[0] < 12) ? horaC[0]+12 : horaC[0], horaC[1]);

    //si la fecha actual es igual a la fecha programada
      if(fechaProgramadaFin.toString() === fechaActual.toString()){
        //si la hora esta dentro del rango de la tienda
          if(horaProgramadaDate >= horaInicio && horaProgramadaDate <= HoraFin && horaProgramadaDate > horaActual){
             horaActual.setMinutes(horaActual.getMinutes() + 45);
            HoraFin.setMinutes(HoraFin.getMinutes() - 90);
             //hora programada debe ser mayor al menos 45 minutos de la hora actual
            if(horaProgramadaDate > horaActual && horaProgramadaDate < HoraFin){
              respuesta.estado = true;
            }else{
                respuesta.msj = "La hora especificada debe tener por lo menos 45 minutos despues de la hora actual y 90 antes de la hora de cierre";
            }
          }else{
            respuesta.msj = "La hora especificada esta fuera de los horarios de la tienda";
          }
      }else{
          if(horaProgramadaDate >= horaInicio && horaProgramadaDate <= HoraFin ){
            horaInicio.setMinutes(horaInicio.getMinutes() + 45);
            HoraFin.setMinutes(HoraFin.getMinutes() - 90);
           if(horaProgramadaDate > horaInicio && horaProgramadaDate < HoraFin ){
             respuesta.estado = true;
           }else{
               respuesta.msj = "La hora especificada debe tener por lo menos 45 minutos despues de la hora de apertura y 90 antes de la hora de cierre";
           }
          }else{
            respuesta.msj = "La hora especificada esta fuera de los horarios de la tienda";
          }
        }
      }
    return respuesta;
}
