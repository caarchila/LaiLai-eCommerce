import React from "react";
import axios from "axios";

async function useHorarioHome(longitud, latitud) {
  var response = { data: false };
  if (longitud !== undefined && latitud !== undefined) {
    //TODO: i remove this url updated on index.js
    response = await axios.get(
      `/clientapp-web/webresources/tiendas/cobertura?longitud=${parseFloat(
        longitud
      )}&latitud=${parseFloat(latitud)}`
    );
  }
  return response.data;
}

export default useHorarioHome;
