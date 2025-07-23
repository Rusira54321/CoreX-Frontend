import {createContext,useContext,useEffect,useState} from "react"
const CartContext = createContext()

export const CartProvider = ({children}) =>{
    const [CartItems,setCartItems] = useState([])
    const addToCart = (product,quantity) =>{
        setCartItems(prev=>{
            const existing = prev.find(item=>item.id===product.id)
            if(existing)
            {
                return prev.map(item=>item.id===product.id?{
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
        setCartItems(prev=>prev.filter(item=>item.id!==id))
    }
    const updateQuantity = (id,qty) =>{
            setCartItems(prev=>prev.map(item=>
                item.id===id?
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