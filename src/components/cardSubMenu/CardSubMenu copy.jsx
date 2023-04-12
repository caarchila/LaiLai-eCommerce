import React from 'react';
import {Card, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';

import './style.css';
const CardSubMenu = (props) =>{
  const propsAnimated = useSpring({to:{
    opacity:1
  },
  from:{
    opacity:0
  }});
  return(
<Col sm={12} md={4} xl={4}>
<animated.div style={propsAnimated} className="contenedor-animado-card-sub-menu">
  <Card className="cardSubMenu my-3">
    <Image src={(props.imagen !== undefined) ? props.imagen : props.disponible} alt="menus" className="menusImg" />
    <div className="contentMenus">
      <h6 className="nombreMenu"> <strong>{props.nombre} </strong></h6>
      <div className='order' >
        <div className='orderReposition'>
          <Link to={`/detalle/${props.idPapa}/${props.id}`} className=" leer-mas buttonOrder">Ordenar</Link>
        </div>
      </div>
      <span className="precioSubMenu">Q {parseFloat(props.precio).toFixed(2)}</span>
    </div>
  </Card>
  </animated.div>
</Col>
)
};

export default CardSubMenu;
