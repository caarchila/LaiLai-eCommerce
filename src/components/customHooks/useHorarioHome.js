import React from 'react';
import axios from 'axios'

async function useHorarioHome(longitud, latitud){
  var response =  { data: false };
  if(longitud !== undefined && latitud !== undefined){
     response = await axios.get(process.env.REACT_APP_BASE_URL + `tiendas/cobertura?longitud=${parseFloat(longitud)}&latitud=${parseFloat(latitud)}`)
  }
  return response.data;
}

export default useHorarioHome;
