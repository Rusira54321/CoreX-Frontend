import {createContext,useContext,useEffect,useState} from "react"
const CartContext = createContext()

export const CartProvider = ({children}) =>{
    const [CartItems,setCartItems] = useState([])
    const addToCart = (product,quantity) =>{
        setCartItems(prev=>{
            const existing = prev.find(item=>item._id===product._id)
            if(existing)
            {
                return prev.map(item=>item._id===product._id?{
                    ...item,quantity:quantity
                }:
                item
            )
            }else
            {
                return [...prev,{
                    ...product,quantity
                }]
            }
        })
    }
    const removeFromCart = (id) =>{
        setCartItems(prev=>prev.filter(item=>item._id!==id))
    }
    const updateQuantity = (id,qty) =>{
            setCartItems(prev=>prev.map(item=>
                item._id===id?
                {
                    ...item,quantity:qty
                }
                :item
            ))
    }
    return (
        <CartContext.Provider value={{CartItems,addToCart,removeFromCart,updateQuantity}}>
                {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)