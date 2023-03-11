import initialState from './initialState';

        //Toma un arreglo como estado inicial y luego a través de la acción propagada (add,remove),
        //agrega un nuevo item al arreglo o lo elimina de él.
export default function cart(state = initialState.cart, action) {
    switch (action.type) {
        case 'ADD':
            localStorage.setItem('carrito', JSON.stringify([...state, action.item]));
            return [...state, action.item];
        case 'REMOVE':
            localStorage.setItem('carrito',JSON.stringify(state.filter( i => i.id !== action.item.id)));
            return state.filter( i => i.id !== action.item.id);
        case "CLEAR_CART":
            localStorage.setItem("carrito", JSON.stringify(action.item));
            return action.item;
        case "UPDATE_CART":
            state.map((c,index)=>{
              if(c.id===action.item.id){
                state[index] = action.item
              }
            })
            localStorage.setItem("carrito", JSON.stringify(state));
            return state;
        default:
            if(localStorage.getItem('carrito') !== null){
              state = JSON.parse(localStorage.getItem('carrito'));
            }
            return state;
    }
};
