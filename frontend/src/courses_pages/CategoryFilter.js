import React from 'react';
import './categoryfilter.css';

function CategoryFilter({ categories, onCategoryChange, selectedCategory }) {
  return (
    <div className="category-filter">
      <h3>Категория</h3>
      <select 
        value={selectedCategory || ''} 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Все курсы</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;