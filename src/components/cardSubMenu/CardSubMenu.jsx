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
    <div style={{display:"flex", flexDirection: "row"}}>
      <Image src={(props.imagen !== undefined) ? props.imagen : props.disponible} alt="menus" className="menusImg" />
      <div style={{display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width: "100%"}}>
        <div className="precioSubMenu">Q {parseFloat(props.precio).toFixed(2)}</div>
        <div className="nombreMenu" style={{height:"100%", padding:"8px", display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "center"}}><h5><strong>{props.nombre}</strong></h5></div>
        <div style={{marginBottom:"16px"}}>
          <Link to={`/detalle/${props.idPapa}/${props.id}`} className=" leer-mas buttonOrder">Ordenar</Link>
        </div>
      </div>
    </div>

  </Card>

  </animated.div>
</Col>
)
};

export default CardSubMenu;
