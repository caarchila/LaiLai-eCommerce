import initialState from "./initialState";

export default function detallepago(state = initialState.pago, action) {
  switch (action.type) {
    case "UPDATE_PAGO":
      sessionStorage.setItem("pago", JSON.stringify(action.item));
      return action.item;
    default:
      if (sessionStorage.getItem("pago") !== null) {
        state = JSON.parse(sessionStorage.getItem("pago"));
      }
      return state;
  }
}
