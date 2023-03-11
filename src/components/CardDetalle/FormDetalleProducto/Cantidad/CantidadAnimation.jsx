import React from 'react';
import {useTransition, animated} from 'react-spring';
import './style.css'


const CantidadAnimation = ({value, toggle}) =>{
const transitions = useTransition(toggle, null,{
  from: { position: 'absolute', transform: 'translate3d(0,-40px,0)', opacity:0},
  enter: { transform: 'translate3d(0,0px,0)', opacity:1},
  leave: { transform: 'translate3d(0,-40px,0)', opacity:0}
});

  return(
transitions.map(({ item, key, props }) =>
  <animated.span className="suma" style={props} key={key}>
    {
      value
    }
  </animated.span>)
  )
}

export default CantidadAnimation;
