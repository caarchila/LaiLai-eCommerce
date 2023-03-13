import React,{useState, useEffect} from 'react';
import {Row,Container, Spinner} from 'react-bootstrap';
import HeaderMenu from '../../components/headerMenu/HeaderMenu';
import axios from 'axios';
import CardSubMenu from '../../components/cardSubMenu/CardSubMenu';
import CardsMenu from '../../components/cardsmenu/card';
import './styles.css'

const Categorias = ({match}) => {
const [menusCategoria , setMenusCategoria] = useState([]);
const [menus, setMenus] = useState([]);
const [menusSubCategorias, setMenuSubcategorias] = useState([]);
const [esSubCategoria, setEsSubCategoria] = useState(false);

const cambiarEsSubCategoria = (id) =>{
    cambiarEstadoCategoria();
        if(menus[0].subcategorias !== undefined){
        setMenus(menus[0].subcategorias.filter(s => parseInt(s.id) === parseInt(id)))
      }
}

const cambiarEstadoCategoria = () =>{
    setEsSubCategoria(false);
}
    useEffect(()=>{

        axios.get('http://190.111.5.114:8282/clientapp-web/webresources/getMenus/APP')
        .then(resp => {
           setMenusCategoria(resp.data.categorias);
           if(parseInt(match.params.idSub) === 0){
              const menu = resp.data.categorias.filter(c => parseInt(c.id) === parseInt(match.params.id));
              if(menu[0].subcategoria === "Si"){
                  const submenu = menu[0].subcategorias;
                  setMenuSubcategorias(submenu);
                  setEsSubCategoria(true);
                  setMenus(menu);
                }else{
                    setMenus(menu);
                  }
                  setMenus(menu);
         }else{
           const menu = resp.data.categorias.filter(c => parseInt(c.id) === parseInt(match.params.id));
           setMenus(menu[0].subcategorias.filter(s => parseInt(s.id) === parseInt(match.params.idSub)))
         }
        });
    },[]);

    const actualizarMenu = (menus) =>{
      setMenus(menus);
    }

    return(<>
    <HeaderMenu id={match.params.id} categorias={menusCategoria} handleUpdateMenu={actualizarMenu} handleEstadoCategoria={cambiarEstadoCategoria}/>
      <Container fluid>
      <div className="my-2 display-4">
        {
            (menus.length === 0)
            ?<Spinner animation="spinner" variant="primary"/>:
            menus[0].nombre
          }
      </div>
        <Row>
            {
            (esSubCategoria===false)?
              (menus.length === 0)?<Spinner animation="spinner" variant="primary" />:
                menus[0].menus?.map(m =>(<CardSubMenu id={m.id} idPapa={match.params.id} key={m.id} imagen={m.imagenes.normal} disponible={m.imagenes.unavailable} nombre={m.nombre} precio={m.precio} />))

              :(menusSubCategorias.length === 0)?<Spinner animation="spinner" variant="primary" />
                  :menusSubCategorias.map(mc =>(<CardsMenu key={mc.id} id={match.params.id} idSub={mc.id} imagen={mc.imagenes.normal} unavailable={mc.imagenes.unavailable} titulo={mc.nombre} cambiarEstado={cambiarEsSubCategoria}/>))

            }
        </Row>
      </Container>
    </>)
};

export default Categorias;
