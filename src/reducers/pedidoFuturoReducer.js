import initialState from './initialState';

export default function pedidoFuturo(state = initialState.pedidoFuturo, action) {
    switch (action.type) {
        case 'UPDATE_PEDIDO':
            sessionStorage.setItem('pedido',JSON.stringify(action.item));
            return action.item;
        default:
          if(sessionStorage.getItem('pedido') !== null){
            state = JSON.parse(sessionStorage.getItem('pedido'));
          }
            return state;
    }
};
