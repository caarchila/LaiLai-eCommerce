import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css';
import {useSpring, animated} from 'react-spring';

const CarouselItem = (props) =>{
  const propsAnimated = useSpring({to:{
    opacity:1
  },
  from:{
    opacity:0
  }});
  return (

  <animated.div className="contenedor-animado-carrusel" style={propsAnimated}>
      <Carousel.Item className={` item ${props.clase}` } interval={1000} >
        <img
          className="d-block w-100 imagen"
          src={ props.imagen }
          alt={ props.titulo }
        />
  
      </Carousel.Item>
      </animated.div>
)
};

export default CarouselItem;
