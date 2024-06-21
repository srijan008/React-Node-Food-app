import React, { createContext, useContext, useReducer } from 'react'

const CartDispatchContext = createContext();

const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            let newArray = [...state]
            newArray.splice(action.index,1)
            return newArray
            // return state.filter((_, index) => index !== action.index);
            case "UPDATE":
                let arr = [...state];
                const updatedIndex = arr.findIndex(food => food.id === action.id);
              
                if (updatedIndex !== -1) {
                  const updatedItem = { ...arr[updatedIndex], qty: parseInt(action.qty) + arr[updatedIndex].qty, price: action.price + arr[updatedIndex].price };
                  arr[updatedIndex] = updatedItem;
                }
              
            return arr;
                 
            
        default:
            console.log("Error in Reducer");
    }
}

export const useCart = () =>{
    const cart = useContext(CartDispatchContext);
    return cart;
}

export const CartProvider = (props) => {
    const[state, dispatch] = useReducer(reducer,[]);
  return (
    <CartDispatchContext.Provider value={{state, dispatch}}>
        {props.children}
    </CartDispatchContext.Provider>
  )
}

