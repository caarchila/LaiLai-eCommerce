import React from 'react';
import facebook from '../../images/Facebook.png';
import instagram from '../../images/Instagram.png';
import './style.css';

const Redes = () =>(
  <>
      <a href="/"><img src={facebook} alt="facebook" className="redes"/></a>
      <a href="/"><img src={instagram} alt="instagram" className="redes"/></a>
    </>

);

export default Redes;
