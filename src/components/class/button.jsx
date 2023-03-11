import React, {Component} from 'react';
import { Dropdown} from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import {Link} from 'react-router-dom';
import Redireccionar from "./redireccionar";
import { updateDireccion } from "../../actions/direccionActions";
import { updateUser } from "../../actions/userActions";
import {updateOcasion} from "../../actions/ocasionActions";
import {updateFechaEntrega} from "../../actions/fechaEntregaActions";
import {updateDetallePago} from '../../actions/detallePagoActions';
import {updatePedidoFuturo} from '../../actions/pedidoFuturoActions';
import './style.css';
import {connect} from 'react-redux'
class Boton extends Component{
  constructor(props){
    super(props)
    this.state = {
      estado: false
    }

    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
 cerrarSesion = () => {
   this.props.updateUser({});
   this.props.updateDireccion({});
   this.props.updateOcasion("");
   this.props.updatePedidoFuturo('N');
   this.props.updateFechaEntrega("");
   this.props.updateDetallePago("");
   this.setState({
     estado:true
   },()=>{
     this.setState({
       estado:false
     })
   })
  }

  render(){
      const usuario = this.props.user
    return(
<>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="btn-danger">
            <MDBIcon far icon="user-circle" />
        </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          Object.keys(usuario).length === 0
         ?
         <Link to="/login" className="dropdown-item">

             Iniciar Sesión

         </Link>
         :
         <>
         <Link to="/ordenes" className="dropdown-item">
          Mis órdenes
         </Link>
         <Link to="/perfil">

              {usuario.nombres +' '+usuario.apellidos}
          </Link>
               <Dropdown.Item onClick={this.cerrarSesion}>Cerrar Sesión</Dropdown.Item>

         </>
        }
      </Dropdown.Menu>
    </Dropdown>

    <Redireccionar url={"/"} estado={this.state.estado} />

</>
    )
  }
}
function mapStateToProps(state, props){
  return {
    user : state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (item) => dispatch(updateUser(item)),
    updateDireccion: item=>dispatch(updateDireccion(item)),
    updateOcasion : item=>dispatch(updateOcasion(item)),
    updateFechaEntrega : item=>dispatch(updateFechaEntrega(item)),
    updateDetallePago: item=>dispatch(updateDetallePago(item)),
    updatePedidoFuturo:item=>dispatch(updatePedidoFuturo(item))
  };
}



export default connect(mapStateToProps,mapDispatchToProps)(Boton);
