import initialState from './initialState';

export default function ocasion(state = initialState.ocasion, action) {
    switch (action.type) {
        case 'UPDATE_OCASION':
            sessionStorage.setItem('ocasion',JSON.stringify(action.item));
            return action.item;
        default:
          if(sessionStorage.getItem('ocasion') !== null){
            state = JSON.parse(sessionStorage.getItem('ocasion'));
          }
            return state;
    }
};
