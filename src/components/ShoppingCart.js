import React, { useState, useEffect} from "react";
import "./ShoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import firebase from "firebase";

import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ShoppingCart() {
    const [products, setProducts] = useState([])
    const { user } = useAuthContext();
   

    useEffect(() => {
        const fnction = async () => {
            
            const cart = await projectFirestore.collection("carts").doc(user.uid).get()
            const a = await projectFirestore.collection("merchandises").where(firebase.firestore.FieldPath.documentId(), 'in', cart.data().merchIds).get()
            console.log(a.docs[1].data().title)
            setProducts(a.docs)
            
        };
        
        fnction()
        
    }, [])

    
    

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
				{products && <div className="cart-products">
					{products.length === 0 && (
						<span className="empty-text">
							Your basket is
							currently empty
						</span>
					)}
					{products.map((product) => (
						<div
							className="cart-product"
							>
							<img
								src={
									product.data().imageURL
								}
								alt={product.data().title}
							/>
							<div className="product-info">
								<h3>
									{product.data().title}
								</h3>
								<span className="product-price">
									{product.data().price}
									TL
								</span>
							</div>
							<select
								className="count"
								value={
									product.count
								}
								>
								{[
									...Array(
										10
									).keys(),
								].map(
									(number) => {
										const num =
											number +
											1;
										return (
											<option
												value={
													num
												}
												key={
													num
												}>
												{
													num
												}
											</option>
										);
									}
								)}
							</select>
							<button
								className="btn remove-btn"
								>
								<RiDeleteBin6Line
									size={20}
								/>
							</button>
						</div>
					))}
					{products.length > 0 && (
						<button className="btn checkout-btn">
							Proceed to checkout
						</button>
					)}
				</div>}
			</div>
		</div>
	);
}

