import React from 'react';
import axios from 'axios'

async function useHorarioHome(longitud, latitud){
  var response =  { data: false };
  if(longitud !== undefined && latitud !== undefined){
     response = await axios.get(`http://190.111.5.114:8282/clientapp-web/webresources/tiendas/cobertura?longitud=${parseFloat(longitud)}&latitud=${parseFloat(latitud)}`)
  }
  return response.data;
}

export default useHorarioHome;
