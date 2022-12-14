import "./ShoppingCart.css";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ShoppingCartItems({products}) {
   

    

	return (
		<div className="cart-products">
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
									product.imageURL
								}
								alt={product.title}
							/>
							<div className="product-info">
								<h3>
									{product.title}
								</h3>
								<span className="product-price">
									{product.price *
										product.rating}
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
				</div>
	);
}