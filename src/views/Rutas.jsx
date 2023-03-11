import React from "react";
import { connect } from "react-redux";
import Login from './login/login';
import Categorias from './Categorias/Categorias';
import Registrarme from './registro/registro';
import Ordenes from './ordenes/misordenes';
import Detalle from './DetalleProducto/Detalle'
import Confirmacion from './Confirmacion/Confirmacion';
import Historial from './DetalleHistorial/detalleHistorial';
import Perfil from './perfil/perfil';
import DatosPersonales from './editarNombreApellido/editarDatosPersonales';
import Contrasenia from './editarContraseña/editarContraseña';
import Mail from './editarEmail/editarDatosPersonalesMail';
import RPassword from './rpassword/rpassword';
import Home from './home/Home';
import useSession from '../components/customHooks/useSession';

import { Route, Switch, Redirect } from "react-router-dom";

const Rutas = props => {
  const isLoggedIn = useSession(props.user);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/categoria/:id/:idSub" exact component={Categorias} />
      <Route path="/login" exact component={Login} />
      <Route path="/registrarme" exact component={Registrarme} />
      <Route path="/detalle/:id/:idDetalle" exact component={Detalle} />
      <Route path="/restablecer-password" exact component={RPassword} />
      {
        (isLoggedIn)?<Route path="/ordenes" exact component={Ordenes} />:<Redirect to='/login' />
      }

      {
        (isLoggedIn)?<Route path="/confirmacion/:token" exact component={Confirmacion} />:<Redirect to='/login' />
      }
      {
        (isLoggedIn)?<Route path="/detalleOrden/:id/:tipo" component={Historial} />:<Redirect to='/login' />
      }

      {
        (isLoggedIn)?<Route path="/detalleOrden/:tipo" component={Historial} />:<Redirect to='/login' />
      }
      {
        (isLoggedIn)?<Route path="/perfil" component={Perfil} />:<Redirect to='/login' />
      }
      {
        (isLoggedIn)?<Route path="/editar-nombre-apellido" component={DatosPersonales} />:<Redirect to='/login' />
      }
      {
        (isLoggedIn)?<Route path="/editar-contraseña" component={Contrasenia} />:<Redirect to='/login' />
      }

      {
        (isLoggedIn)?<Route path="/editar-Email" component={Mail} />:<Redirect to='/login' />
      }
    </Switch>
  );
};

function mapStateToProps(state, props){
  return{
    user:state.user
  }
}
Rutas.defaultProps ={
  user: {}
}

export default connect(mapStateToProps, null)(Rutas)
