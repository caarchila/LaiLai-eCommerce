import initialState from './initialState';

export default function direccion(state = initialState.direccion, action) {
    switch (action.type) {
        case 'UPDATE_DIRECCION':
            sessionStorage.setItem('direccion',JSON.stringify(action.item));
            return action.item;
        default:
          if(sessionStorage.getItem('direccion') !== null){
            state = JSON.parse(sessionStorage.getItem('direccion'));
          }
            return state;
    }
};
