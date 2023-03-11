import React from 'react';
import {Redirect} from 'react-router-dom';

const Redireccionar = ({ url, estado })=>{
  return(
    <>
    {
        (estado === false)
        ?
        ''
        :
        <Redirect to={url}/>

    }
    </>
)
}
export default Redireccionar
