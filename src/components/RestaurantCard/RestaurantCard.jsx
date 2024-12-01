import React from "react";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRating,
  sla,
  areaName,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{cuisines.join(", ")}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src="https://th.bing.com/th?q=Green+Colour+Star+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
              alt="logo"
              className="w-5 h-5"
            />
            <p className="text-gray-700">{avgRating}</p>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://th.bing.com/th?q=Moto+Delivery+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
              alt="del-logo"
              className="w-5 h-5"
            />
            <p className="text-gray-700">{sla.deliveryTime} min</p>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <h4 className="text-gray-700">{areaName}</h4>
        </div>
      </div>
    </div>
  );
};

export const promotedCard = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <label className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
        Promoted
      </label>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
