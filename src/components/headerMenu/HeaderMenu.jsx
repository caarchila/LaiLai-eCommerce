import React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import './style.css';
import {Link} from 'react-router-dom';
import withLoader from '../HOC/withLoader';
class HeaderMenu extends React.Component {

    handleReloadMenus(id, subcat, index){
        if(this.props.handleUpdateMenu !== undefined){
              if(subcat !== "Si"){
                this.props.handleUpdateMenu(this.props.categorias.filter(c => parseInt(c.id) === parseInt(id)))
              }else{
                this.props.handleUpdateMenu(this.props.categorias[index].subcategorias.filter(s => parseInt(s.id) === parseInt(id)))
              }
          }
    }
  
    handleCambiarEstado(){
      if(this.props.handleEstadoCategoria !== undefined){
        this.props.handleEstadoCategoria();
        }
    }
  render(){
    const categorias = this.props.categorias;
    
    return(
      <Nav className="justify-content-center" id="headerMenu" activeKey="/home">
      {
        categorias.map((c, index) =>  (c.subcategoria !== "Si")?(
          <Nav.Item key={c.id} className={(parseInt(c.id) === parseInt(this.props.id)) ? "activeMenu contenedorLinks" : "contenedorLinks"}>
            <Link className="links" to={`/categoria/${c.id}/${0}`} onClick={() => {this.handleReloadMenus(c.id); this.handleCambiarEstado();}}>{c.nombre}</Link>
          </Nav.Item>
        ):(
          <NavDropdown title={c.nombre} key={c.id}>
          {
              c.subcategorias.map(s =>  (
                <Link key={s.id} className="dropdown-item" to={`/categoria/${c.id}/${s.id}`} onClick={() => {this.handleReloadMenus(s.id, c.subcategoria, index);this.handleCambiarEstado();}}>{s.nombre}</Link>
              )
              )
          }
          </NavDropdown>
          )
        )
      }
      </Nav>
    )
  }
}

export default withLoader(HeaderMenu,"categorias");
