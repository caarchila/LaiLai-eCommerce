import React,{useState, useEffect} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import CardDetalle from '../../components/CardDetalle/CardDetalle';
import axios from 'axios';
import HeaderMenu from '../../components/headerMenu/HeaderMenu';

const Detalle = ({match}) => {
  const [detalle, setDetalle] = useState({});
  const [menusCategoria , setMenusCategoria] = useState([]);
  const [categoria, setCategoria] = useState([]);
  useEffect(()=>{
      axios.get(process.env.REACT_APP_BASE_URL + `getMenuDetail/${match.params.idDetalle}`)
      .then(resp => {
         setDetalle(resp.data.menu);
      });

      axios.get(process.env.REACT_APP_BASE_URL + 'getMenus/APP')
      .then(resp => {
         setMenusCategoria(resp.data.categorias);
         const menu = resp.data.categorias.filter(c => parseInt(c.id) === parseInt(match.params.id));
         if(menu[0] !== undefined){
         setCategoria(menu[0].nombre)
        }
      });
  },[]);

return(
  <>
<HeaderMenu id={match.params.id} categorias={menusCategoria}/>
  <Container fluid>
  <h1 className="my-2 display-4">
      {
        categoria
      }
  </h1>
      <Row>
        <Col sm={12} md={12} xl={12}>
          <CardDetalle detalleMenu={detalle} edi={''} />
        </Col>
      </Row>
    <hr className="mb-5"/>
  </Container>
  </>
)
};

export default Detalle;
