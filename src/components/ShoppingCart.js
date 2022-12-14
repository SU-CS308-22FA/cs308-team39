import React, { useState, useEffect} from "react";
import "./ShoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";

import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import ShoppingCartItems from "./ShoppingCartItems";

export default function ShoppingCart() {
    const [pending, setPending] = useState(false)
    const [products, setProducts] = useState([])
    const { user } = useAuthContext();
    
    console.log("1")

    useEffect(() => {
        const fnction = async () => {
            console.log("2")
            setPending(true)
            const cart = await projectFirestore.collection("carts").doc(user.uid).get()
            
            cart.data().merchIds.forEach(async element => {
               const a = await projectFirestore.collection("merchandises").doc(element).get()
               products.push(a.data())
            });
            setPending(false)
            console.log("3")
            
        };
        
        fnction()
        setProducts(products)
    }, [])

    console.log("4")
    

	return (
		<div
			className="modal">
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button
						className="btn close-btn"
						>
						<AiFillCloseCircle
							size={30}
						/>
					</button>
				</div>
				{!pending && <ShoppingCartItems products = {products}/>}
			</div>
		</div>
	);
}

