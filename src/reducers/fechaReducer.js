import initialState from './initialState';

export default function fechaProgramada(state = initialState.fecha, action) {
    switch (action.type) {
        case 'UPDATE_FECHA':
            sessionStorage.setItem('fecha',JSON.stringify(action.item));
            return action.item;
        default:
          if(sessionStorage.getItem('fecha') !== null){
            state = JSON.parse(sessionStorage.getItem('fecha'));
          }
            return state;
    }
};
