import React from "react";

const CategoryFilter = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded ${
          !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded ${
            selectedCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
