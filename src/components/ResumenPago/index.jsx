import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Button, Table } from "react-bootstrap";
import "./style.css";
import { connect } from "react-redux";
import Redireccionar from "../class/redireccionar";
import { clearCart } from "../../actions/cartActions";
import { growl } from "@crystallize/react-growl";
import useHorario from "../customHooks/useHorario";
import useHorarioHome from "../customHooks/useHorarioHome";
import axios from "axios";
import { validarHorarioSeleccionado } from "../../util/funciones";
import useHorarioFuturo from "../customHooks/useHorarioFuturo";

const Resumen = (props) => {
  const [estado, setEstado] = useState(false);
  const [token, setToken] = useState("");

  //TODO: adding horario habil futuro
  const horarioHabilFuturo = useHorarioFuturo(
    props.direccion.horaApertura,
    props.direccion.horaCierre,
    props.fechaEntrega
  );

  const horarioHabil = useHorario(
    props.direccion.horaApertura,
    props.direccion.horaCierre
  );
  const horarioHabilHome = useHorarioHome(
    props.direccion.longitud,
    props.direccion.latitud
  );
  const total =
    props.historial.menus !== undefined
      ? props.historial.menus.reduce(function (suma, c) {
          return parseFloat(suma) + parseFloat(c.precioFinal);
        }, 0)
      : 0.0;
  const subtotal = total;

  const confirmarPago = async () => {
    var direccion = "idDireccion";
    var estado = true;
    var mensaje = "";
    var tipo = "";

    console.log("ocasion", props.ocasion);
    console.log("pedido futuro", props.pedidoFuturo);
    console.log("pedido fecha ", props.fechaEntrega);
    console.log("hora apertura", props.direccion.horaApertura);
    console.log("hora cierre", props.direccion.horaCierre);
    console.log("horario habil", horarioHabil);

    const fechaEntrega = new Date(props.fechaEntrega);
    const horaEntrega =
      fechaEntrega.getHours() +
      ":" +
      fechaEntrega.getMinutes().toString().padStart(2, 0);
    //TODO: entra cuando es pick up y pedido futuro
    if (props.ocasion === "LLV") {
      direccion = "idTienda";
      if (props.pedidoFuturo === "S") {
        let response = validarHorarioSeleccionado(
          horaEntrega,
          props.direccion.horaApertura,
          props.direccion.horaCierre,
          props.fechaEntrega
        );
        console.log("respuesta de validar hora", response);
        //TODO: works
        if (!response.estado) {
          estado = false;
          mensaje = response.msj;
          tipo = "warning";
        }
      } else {
        if (!horarioHabil) {
          estado = false;
          mensaje =
            "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
          tipo = "warning";
        }
      }
    } else {
      console.log("estoy aca");
      await horarioHabilHome.then((data) => {
        if (data.result === "ACT") {
          console.log("fecha entrega resumen: ", props.fechaEntrega);
          console.log("hora Apertura : ", data.tiendas[0].horaApertura);
          console.log("hora cierre : ", data.tiendas[0].horaCierre);
          let response = validarHorarioSeleccionado(
            horaEntrega,
            data.tiendas[0].horaApertura,
            data.tiendas[0].horaCierre,
            props.fechaEntrega
          );
          if (!response.estado) {
            estado = false;
            mensaje = response.msj;
            tipo = "warning";
          }
        } else {
          estado = false;
          mensaje =
            "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
          tipo = "warning";
        }
      });
    }

    const tomaPedido = {
      monto: subtotal,
      canal: "APP",
      idCliente: props.user.idCliente,
      [direccion]: props.direccion.id,
      telefono: props.direccion.telefono,
      ocasion: props.ocasion,
      indicaciones:
        props.direccion.referencias === undefined
          ? ""
          : props.direccion.referencias,
      factura: false,
      menus: props.cart,
      detallePago: [{ formaPago: props.detallePago || props.detallePago[0] }],
      pedidoFuturo: props.pedidoFuturo,
      fechaEntrega: props.fechaEntrega,
    };

    console.log("verdadero tomapedido", tomaPedido);
    if (props.cart.length === 0) {
      estado = false;
      tipo = "warning";
      mensaje =
        "No se puede procesar la compra porque no tiene productos en el carrito.";
    }
    if (Object.keys(props.direccion).length === 0) {
      estado = false;
      tipo = "warning";
      mensaje =
        "No se puede procesar la compra porque no ha especificado una dirección.";
    }
    if (Object.keys(props.user).length === 0) {
      estado = false;
      tipo = "warning";
      mensaje = "No existe un usuario en la store.";
    }

    if (props.detallePago === "") {
      estado = false;
      tipo = "warning";
      mensaje =
        "No se puede procesar la compra porque no ha especificado un metodo de pago.";
    }

    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(props.fechaEntrega);
    var dayName = days[d.getDay()];
    if (dayName === "Sunday") {
      estado = false;
      mensaje = "Este dia no abrimos.";
      tipo = "warning";
    }
    if (estado) {
      //TODO: i remove this url updated on index.js
      axios
        .post("/clientapp-web/webresources/order/register", tomaPedido)
        .then(async function (response) {
          if (response.data.result) {
            setToken(response.data.codigoPedido);
            props.clearCart([]);
            setEstado(true);
          } else {
            const myGrowl = await growl({
              type: "error",
              title: "información",
              message: response.data.msg,
            });
            console.log(response.data);
          }
        })
        .catch((e) => console.log(e));
    } else {
      const myGrowl = await growl({
        type: tipo,
        title: "información",
        message: mensaje,
      }).catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Card className="contenedor-resumen-pago">
        <Card.Body className="contenido-resumen-pago">
          <Card.Title>Resumén de Pago</Card.Title>
          <Table responsive className="tabla-resumen">
            <tbody>
              <tr>
                <td className="total-producto">
                  <Card.Text className="h6">
                    <strong>Productos({props.historial.menus.length})</strong>
                  </Card.Text>
                </td>
                <td className="total-producto">
                  <Card.Text>
                    <strong>Q.{parseFloat(total).toFixed(2)} </strong>
                  </Card.Text>
                </td>
              </tr>

              <tr>
                <td>
                  <Card.Text className="h6">
                    <strong>Subtotal</strong>
                  </Card.Text>
                </td>
                <td>
                  <Card.Text>
                    <strong>Q.{parseFloat(subtotal).toFixed(2)}</strong>
                  </Card.Text>
                </td>
              </tr>
              <tr>
                <td>
                  <Card.Text className="h6 total-orden">
                    <strong>Total de la orden</strong>
                  </Card.Text>
                </td>
                <td>
                  <Card.Text className="total-orden">
                    <strong>Q.{parseFloat(subtotal).toFixed(2)} </strong>
                  </Card.Text>
                </td>
              </tr>
            </tbody>
          </Table>
          {parseInt(props.boton) === 0 ? (
            ""
          ) : (
            <Row>
              <Col>
                <Button
                  variant="danger"
                  type="button"
                  id="boton-confirmar"
                  block
                  onClick={confirmarPago}
                >
                  Confirmar y pagar
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
        <Card.Body className="resumen-pago-footer">
          <Card.Text>
            *Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            nulla blandit auctor.
          </Card.Text>
        </Card.Body>
      </Card>
      <Redireccionar url={`/confirmacion/${token}`} estado={estado} />
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    cart: state.cart,
    user: state.user,
    direccion: state.direccion,
    ocasion: state.ocasion,
    detallePago: state.detallePago,
    pedidoFuturo: state.pedidoFuturo,
    fechaEntrega: state.fechaEntrega,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCart: (item) => dispatch(clearCart(item)),
  };
}

Resumen.defaultProps = {
  pedidoFuturo: "N",
  fechaEntrega: "",
  detallePago: "",
};

export default connect(mapStateToProps, mapDispatchToProps)(Resumen);
