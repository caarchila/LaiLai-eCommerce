import React from 'react';
import './style.css';
import {Image, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';

const Cards = ({ id,idSub, imagen, titulo , unavailable, cambiarEstado}) => {
const cambiar = (e) =>{
  if(cambiarEstado !== undefined){
      e.preventDefault();
    cambiarEstado(e.currentTarget.className);
  }
}
const propsAnimated = useSpring({to:{
  opacity:1
},
from:{
  opacity:0
}});

  return(
<>

  <Col sm={12} md={4} xl={4}>
  <Link to={`/categoria/${id}/${idSub}`} className={`${idSub}`} onClick={cambiar}>
      <animated.div className="cardtitle" style={propsAnimated}>
        {
          imagen!= null
          ?
          <Image src={imagen} alt=""  className="imagenMenu" style={{marginTop:(idSub !== 0)?'0px':`-75px`}}/>
          :
          <Image src={unavailable} alt=""  className="imagenMenu"/>
        }
        <span className="Caption">{titulo}</span>
      </animated.div>
      </Link>
  </Col>
  </>
)
};

export default Cards;
