import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../Utils/CartSlice";

const Accordion = ({ items }) => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.card?.info?.id === item.card?.info?.id
    );
    if (existingItem) {
      dispatch(increaseQuantity(item.card?.info?.id));
    } else {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    } else {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      {items.map((item) => {
        const existingItem = cartItems.find(
          (cartItem) => cartItem.card?.info?.id === item.card?.info?.id
        );

        return (
          <div key={item.card?.info?.id} className="flex p-4 border-b-2 border-gray-300">
            <div className="w-9/12">
              <span className="font-semibold text-gray-700">{item.card?.info?.name}</span>
              <p className="text-gray-600">
                ₹
                {Math.floor(item.card?.info?.price / 100) ||
                  Math.floor(item.card?.info?.defaultPrice / 100)}
              </p>
              <p className="text-xs text-gray-500">{item.card?.info?.description}</p>
            </div>
            <div className="w-3/12 relative flex flex-col items-center justify-center">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card?.info?.imageId}`}
                alt={item.card?.info?.name}
                className="w-36 h-24 mb-3 rounded-md"
              />
              {existingItem ? (
                <div className="flex items-center font-bold bg-gray-600 text-white rounded-md px-3 py-2 space-x-3 absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <button
                    className="text-white rounded-md flex items-center justify-center"
                    onClick={() =>
                      handleDecreaseQuantity(existingItem.card?.info?.id, existingItem.quantity)
                    }
                  >
                    -
                  </button>
                  <p className="text-sm">{existingItem.quantity}</p>
                  <button
                    className=" text-white rounded-md flex items-center justify-center"
                    onClick={() =>
                      handleIncreaseQuantity(existingItem.card?.info?.id)
                    }
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white px-3 py-2 rounded-md text-sm"
                  onClick={() => handleAddItems(item)}
                >
                  Add +
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div className="mt-10">
        {cartItems.length > 0 &&
          cartItems.map((C) => (
            <div
              key={C.card?.info?.id}
              className="flex justify-between items-center mb-4 p-4 border-b border-gray-300"
            >
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">{C.card?.info?.name}</span>
                <p className="ml-4 text-xs text-gray-500">{C.card?.info?.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-700 text-white rounded-md flex items-center justify-center"
                  onClick={() =>
                    handleDecreaseQuantity(C.card?.info?.id, C.quantity)
                  }
                >
                  -
                </button>
                <p className="text-gray-700">{C.quantity}</p>
                <button
                  className="bg-gray-700 text-white rounded-md flex items-center justify-center"
                  onClick={() => handleIncreaseQuantity(C.card?.info?.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Accordion;
