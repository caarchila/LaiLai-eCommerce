import initialState from './initialState';

export default function modal(state = initialState.show, action) {
    switch (action.type) {
        case 'SHOW':
            return action.item;
        default:
            return state;
    }
};
