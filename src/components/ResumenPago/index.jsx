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
import { updatefechaentrega } from "../../actions/fechaEntregaActions";
import { updateTelefonoPedido } from "../../actions/telefonoPedido";

const Resumen = (props) => {
  const [estado, setEstado] = useState(false);
  const [token, setToken] = useState("");

  const horarioHabil = useHorario(
    Object.keys(props.direccion).length > 0
      ? props.ocasion === "LLV"
        ? props.direccion.horaApertura
        : props.direccion.tienda.horaAperturaDomi
      : "",

    Object.keys(props.direccion).length > 0
      ? props.ocasion === "LLV"
        ? props.direccion.horaCierre
        : props.direccion.tienda.horaCierreDomi
      : ""
  );
  console.log("delete this ");
  const horarioHabilFuturo = useHorarioFuturo(
    Object.keys(props.direccion).length > 0
      ? props.ocasion === "LLV"
        ? props.direccion.horaApertura
        : props.direccion.tienda.horaAperturaDomi
      : "",

    Object.keys(props.direccion).length > 0
      ? props.ocasion === "LLV"
        ? props.direccion.horaCierre
        : props.direccion.tienda.horaCierreDomi
      : "",
    props.fechaentrega
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

    //Validando los datos de entrada
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
    if (props.detallepago === "") {
      estado = false;
      tipo = "warning";
      mensaje =
        "No se puede procesar la compra porque no ha especificado un metodo de pago.";
    }
    if (
      (props.ocasion === "DOM" &&
        (!props.direccion.telefono || props.direccion.telefono === "")) ||
      (props.ocasion === "LLV" &&
        (!props.direccion.telefonoPedido ||
          props.direccion.telefonoPedido === ""))
    ) {
      estado = false;
      tipo = "warning";
      mensaje = "Añadir un número de teléfono para el pedido";
    }
    if (props.fechaentrega === "") {
      estado = false;
      tipo = "warning";
      mensaje = "Añadir una hora para la entrega";
    }
    if (estado === false) {
      const myGrowl = await growl({
        type: tipo,
        title: "información",
        message: mensaje,
      });

      return;
    }

    // const fechaentrega = new Date(props.fechaentrega);
    // const horaEntrega =
    //   fechaentrega.getHours() +
    //   ":" +
    //   fechaentrega.getMinutes().toString().padStart(2, 0);

    //TODO: entra cuando es pick up y pedido futuro
    if (props.ocasion === "LLV") {
      direccion = "idTienda";
      if (props.pedidoFuturo === "S") {
        // let response = validarHorarioSeleccionado(
        //   horaEntrega,
        //   props.direccion.horaApertura,
        //   props.direccion.horaCierre,
        //   props.fechaentrega
        // );
        // // console.log("respuesta de validar hora", response);
        // if (!response.estado) {
        //   estado = false;
        //   mensaje = response.msj;
        //   tipo = "warning";
        // }
        if (!horarioHabilFuturo.estado) {
          estado = false;
          mensaje = horarioHabilFuturo.error;
          tipo = "warning";
        }
      } else {
        //TODO: horario habil change here
        if (!horarioHabil) {
          estado = false;
          mensaje =
            "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
          tipo = "warning";
        }
      }
    } else {
      await horarioHabilHome.then((data) => {
        if (data.result === "ACT") {
          // console.log("fecha entrega resumen: ", props.fechaentrega);
          // console.log("hora Apertura : ", data.tiendas[0].horaApertura);
          // console.log("hora cierre : ", data.tiendas[0].horaCierre);
          // console.log("hora entrega", horaEntrega);
          if (!props.fechaentrega) {
            estado = false;
            mensaje = "No olvides seleccionar una hora para tu entrega";
            tipo = "warning";
            return;
          }
          if (props.pedidoFuturo === "S") {
            if (!horarioHabilFuturo.estado) {
              estado = false;
              mensaje = horarioHabilFuturo.error;
              tipo = "warning";
            }
          } else if (!horarioHabil) {
            estado = false;
            mensaje =
              "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
            tipo = "warning";
          }

          // let response = validarHorarioSeleccionado(
          //   horaEntrega,
          //   data.tiendas[0].horaApertura,
          //   data.tiendas[0].horaCierre,
          //   props.fechaentrega,
          //   props.pedidoFuturo
          // );
          // if (!response.estado) {
          //   estado = false;
          //   mensaje = response.msj;
          //   tipo = "warning";
          // }
        }
        // else {
        //   estado = false;
        //   mensaje =
        //     "No contamos con servicio a domilicio en este horario, te sugerimos programar la entrega.";
        //   tipo = "warning";
        // }
      });
    }
    //adding 1 hour to deliver
    const fechaentrega = new Date();
    if (props.pedidoFuturo === "N") {
      fechaentrega.setHours(fechaentrega.getHours() + 1);
    }
    const tomaPedido = {
      monto: subtotal,
      canal: "APP",
      idCliente: props.user.idCliente,
      [direccion]: props.direccion.id,
      telefono:
        props.ocasion === "LLV"
          ? props.telefonoPedido //TODO: change props.direccion.telefonoPedido to props.telefonoPedido
            ? props.direccion.telefonoPedido
            : null
          : props.direccion.telefono,
      ocasion: props.ocasion,
      indicaciones:
        props.direccion.referencias === undefined
          ? ""
          : props.direccion.referencias,
      factura: false,
      menus: props.cart,
      detallePago: [{ formaPago: props.detallepago || props.detallepago[0] }],
      pedidoFuturo: props.pedidoFuturo,
      fechaEntrega:
        props.pedidoFuturo === "N" ? fechaentrega : props.fechaentrega,
    };

    console.log("telefono de pedido", tomaPedido.telefono);
    console.log("verdadero tomapedido", tomaPedido);
    console.log("verdadera fecha pedido", props.fechaentrega);

    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(props.fechaentrega);
    var dayName = days[d.getDay()];
    if (dayName === "Sunday") {
      estado = false;
      mensaje = "Este dia no abrimos.";
      tipo = "warning";
    }
    if (estado) {
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
    detallepago: state.detallepago,
    pedidoFuturo: state.pedidoFuturo,
    fechaentrega: state.fechaentrega,
    telefonoPedido: state.telefonoPedido,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCart: (item) => dispatch(clearCart(item)),
    updatefechaentrega: (item) => dispatch(updatefechaentrega(item)),
    updateTelefonoPedido: (item) => dispatch(updateTelefonoPedido(item)),
  };
}

Resumen.defaultProps = {
  pedidoFuturo: "N",
  fechaentrega: "",
  detallepago: "",
  telefonoPedido: "",
};

export default connect(mapStateToProps, mapDispatchToProps)(Resumen);
