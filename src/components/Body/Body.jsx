import React, { useEffect, useState } from "react";
import Shimmer from "../Shimmer/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../useOnlineStatus";
import RestaurantCard, { promotedCard } from "../RestaurantCard/RestaurantCard";

const Body = () => {
  const [restaurents, setRestaurents] = useState([]);
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [inputText, setInputText] = useState("");

  const CardWithLabels = promotedCard(RestaurantCard);

  const fetchData = async () => {
    try {
      const result = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonResult = await result.json();
      const restaurantsData =
        jsonResult?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurents(restaurantsData);
      setOriginalRestaurants(restaurantsData);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  const FilterRestaurants = () => {
    const filteredRests = originalRestaurants.filter(
      (res) => res.info && res.info.avgRating > 4.5
    );
    setRestaurents(filteredRests);
  };

  const searchRests = () => {
    const searchResults = originalRestaurants.filter(
      (res) =>
        res.info &&
        res.info.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setRestaurents(searchResults);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === true) return <h1 className="text-center text-red-500">Check Your Internet Connection.</h1>;

  return (
    <div className="container mx-auto p-6">
      <div className="filterContainer flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={FilterRestaurants}
        >
          Rating 4.5+
        </button>
        <div className="searchContainer flex items-center space-x-2">
          <input
            type="search"
            className="px-4 py-2 border rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            placeholder="Search Restaurants"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            onClick={searchRests}
          >
            Search
          </button>
        </div>
      </div>
      <div className="restaurantContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurents.length > 0 ? (
          restaurents.map(
            (res) =>
              res.info && (
                <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
                  {res.info.avgRating >= 4.5 ? (
                    <CardWithLabels {...res.info} />
                  ) : (
                    <RestaurantCard {...res.info} />
                  )}
                </Link>
              )
          )
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default Body;
