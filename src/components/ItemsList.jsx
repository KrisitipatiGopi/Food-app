import React from "react";
import Accordion from "./Accordion";

const ItemsList = ({ data, showItems, setShowIndex }) => {
  const toggleItems = () => {
    setShowIndex();
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mb-6">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center bg-gradient-to-r from-gray-500 to-gray-600 px-5 py-4 cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-all duration-300 rounded-lg"
          onClick={toggleItems}
        >
          <span className="text-lg font-semibold text-gray-200">{data.title}</span>
          <span className="text-2xl text-gray-200">
            {showItems ? "⇧" : "⇩"}
          </span>
        </div>
        {showItems && (
          <div className="bg-gray-50 p-5 border-t border-gray-300">
            <Accordion items={data.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsList;
