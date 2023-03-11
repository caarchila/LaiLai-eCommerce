import initialState from './initialState';

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case 'UPDATE':
            sessionStorage.setItem('user',JSON.stringify(action.item));
            return action.item;
        default:
          if(sessionStorage.getItem('user') !== null){
            state = JSON.parse(sessionStorage.getItem('user'));
          }
            return state;
    }
};
