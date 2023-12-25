import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]

        case "REMOVE":
            return state.filter((item, index) => index !== action.index);


        case "UPDATE":
            return state.map((item)=>{
                if(item.id===action.id && item.size===action.size){
                    return{
                        ...item,
                        qty:parseInt(item.qty)+parseInt(action.qty),
                        size:action.size,
                        price:item.price+action.price
                    }
                }
                return item;
            })
        case "DROP":
            return [];    

        // default:
            // console.log("Error in Reducer");
    }
};

export const CartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {props.children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);