import React from 'react';
import './styles.css';

const ContentMenus = ({obj, totalProducto, totalOpciones}) =>{
const total = (parseFloat(obj.precioUnitario) + parseFloat(totalOpciones)) * parseFloat((totalProducto));


  return(

  <div className="contentMenusDetalle">
    <h2> <strong>{obj.nombre} </strong></h2>
    <p>{obj.descripcion}</p>
    <span className="precioSubMenuDetalle">Q {(!isNaN(total))?parseFloat(total).toFixed(2):0.00}</span>
  </div>

)};

export default ContentMenus;
