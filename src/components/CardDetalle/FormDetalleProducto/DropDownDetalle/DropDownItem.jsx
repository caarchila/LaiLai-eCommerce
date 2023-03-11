import React from 'react';

const DropDownItem = ({obj}) =>(
      <option value={obj.idVariante}>{(obj.precioExtra === 0.0)?obj.variante:obj.variante + ' +' + parseFloat(obj.precioExtra)}</option>
);

export default DropDownItem;
