import React from 'react';

const DropDownItem = ({obj, tipo, precio}) =>{
      
      const precios = precio + obj.precioExtra
      
      return(
      <>
            {tipo === "IND"? 
                  <option value={obj.idVariante}>{obj.variante + ' Q ' + parseFloat(precios) + '.00'}</option> :
                  <option value={obj.idVariante}>{(obj.precioExtra === 0.0)?obj.variante:obj.variante + ' +' + parseFloat(obj.precioExtra)}</option> 
            }
      </>
)};

export default DropDownItem;
