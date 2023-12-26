import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state]
            const foundIndex = arr.findIndex(item => item.id === action.id && item.size === action.size);
            if (foundIndex !== -1) {
                const foundItem = arr[foundIndex];
                arr[foundIndex] = {
                    ...foundItem,
                    qty: (parseInt(action.qty)) + (parseInt(foundItem.qty)),
                    price: action.price + foundItem.price
                };
            }
            return arr;

        case "DROP":
            let empArray = []
            return empArray

        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatch = () => useContext(CartDispatchContext)
