import initialState from "./initialState";

export default function telefonoPedido(
  state = initialState.telefonoPedido,
  action
) {
  switch (action.type) {
    case "UPDATE_TELEFONO_PEDIDO":
      console.log("telefono", action.item);
      sessionStorage.setItem("telefonoPedido", JSON.stringify(action.item));
      return action.item;
    default:
      if (sessionStorage.getItem("telefonoPedido") !== null) {
        state = JSON.parse(sessionStorage.getItem("telefonoPedido"));
      }
      return state;
  }
}
