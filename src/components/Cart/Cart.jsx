import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, decreaseQuantity, increaseQuantity, removeItem } from "../../Utils/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    } else {
      handleRemoveItem(id); 
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center space-y-4 mb-6 gap-10">
        {cartItems.length !== 0 && (
          <button
            className="bg-black font-bold text-white rounded-xl py-2 px-6 hover:bg-gray-800 transition duration-200"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((C) => (
          <div
            key={C.card?.info?.id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-lg"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">
                {C.card?.info?.name || "Unnamed Item"}
              </h3>
              <p className="text-gray-600">
                ₹{" "}
                {C.quantity * C.card?.info?.price / 100 ||C.quantity * C.card?.info?.defaultPrice / 100}
              </p>
            </div>
            <div className="bg-black text-white p-2 space-x-3 flex rounded-md font-bold">
              <button onClick={() => handleDecreaseQuantity(C.card?.info?.id, C.quantity)}>-</button>
              <p>{C.quantity}</p>
              <button onClick={() => addQuantity(C.card?.info?.id)}>+</button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            src="https://www.ecareproducts.com/images/empty_cart.png"
            className="mt-10"
          />
          <button
            className="bg-black font-bold text-white rounded-xl py-2 px-6 hover:bg-gray-800 transition duration-200"
            onClick={() => navigate("/")}
          >
            Add Items
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
