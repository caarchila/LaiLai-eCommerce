import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import MisOrdenes from '../ordenes/misordenes';

class Ordenes extends Component {
    constructor(props){
      super(props)
      this.state = {
        orden: []
      }
    }

    componentDidMount(){
      let id = this.props.user.idCliente;

      axios.get(`http://190.111.5.114:8282/clientapp-web/webresources/order/activas/${id}`)
      .then(resp => {
        this.setState({
          orden: resp.data.ordenes
        })
      });
    }

    render(){
      const {orden} = this.state
      return(
        <>

          {
            orden.map(o=>(
              <MisOrdenes key={o.id} id={o.id} titulo={o.codigoPedido} fecha={o.fecha} hora={o.hora} totalOrden={o.totalOrden}/>
            ))
          }

        </>
      )
    }
}
function mapStateToProps(state, props){
  return{
    user:state.user
  }
}

export default connect(mapStateToProps, null)(Ordenes);
