import React, { useEffect, useState } from "react";
import Shimmer from "../Shimmer/Shimmer";
import { useParams } from "react-router-dom";
import ItemsList from "../ItemsList";

const Restaurant = () => {
  const { resId } = useParams();
  const [items, setItems] = useState([]);
  const [RestaurantDetails, setRestaurantDetails] = useState();
  const [showIndex, setShowIndex] = useState(null);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.406498&lng=78.47724389999999&restaurantId=${resId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }
      const json = await response.json();
      setRestaurantDetails(json?.data?.cards[2].card?.card?.info);

      const data =
        json.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const itemsCards = data.filter(
        (each) =>
          each.card.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
          each.card?.card?.title
      );

      setItems(itemsCards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (!RestaurantDetails || !items.length) {
    return <Shimmer />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {RestaurantDetails.name}
        </h1>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">
            {RestaurantDetails.avgRating}★ &nbsp; | &nbsp;{" "}
            {RestaurantDetails.totalRatingsString} &nbsp; | &nbsp;{" "}
            {RestaurantDetails.costForTwoMessage}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {RestaurantDetails.cuisines.join(", ")}
          </p>
          <p className="text-gray-600 mt-2">
            Estimated Delivery Time:{" "}
            <span className="font-semibold text-gray-800">
              {RestaurantDetails.sla.deliveryTime} Minutes
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        {items.map((category, index) => (
          <ItemsList
            key={category.card.card.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
