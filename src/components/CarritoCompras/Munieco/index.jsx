import React from 'react';
import cuerpo from './partes/cuerpo.svg';
import brazoIz from './partes/brazoiz.svg';
import brazoDer from './partes/brazoder.svg';
import { useSpring, animated as a } from 'react-spring'
import './styles.css';

const Munieco = () =>{
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x/70}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(-${x / 500}px,${y / 10}px,0)`
const [props, set] = useSpring(() => ({ xy:[0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  return(
    <div className="contenedor-munieco" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
          <a.img src={brazoIz} alt="brazo-izquierdo" className="brazo-izquierdo" style={{ transform: props.xy.interpolate(trans1) }} />
      <a.img src={cuerpo} alt="cuerpo" className="cuerpo" />
      <a.img src={brazoDer} alt="brazo-derecho" className="brazo-derecho" style={{ transform: props.xy.interpolate(trans2)}} />
    </div>
  )
}

export default Munieco;
