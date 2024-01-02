import { combineReducers } from "redux";
import cart from "./cartReducer";
import user from "./userReducer";
import direccion from "./direccionReducer";
import ocasion from "./ocasionReducer";
import modal from "./modalReducer";
import fechaentrega from "./fechaReducer";
import detallepago from "./pagoReducer";
import pedidoFuturo from "./pedidoFuturoReducer";

const rootReducer = combineReducers({
  cart,
  user,
  direccion,
  modal,
  ocasion,
  fechaentrega,
  detallepago,
  pedidoFuturo,
});

export default rootReducer;
