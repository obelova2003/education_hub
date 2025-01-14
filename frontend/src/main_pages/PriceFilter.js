import React from 'react';
import './pricefilter.css';

function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
  return (
    <div className="price-filter">
      <h3>Цена</h3>
      <div className="price-inputs">
        <input
          type="number"
          placeholder="От"
          value={minPrice}
          onChange={(e) => onPriceChange('min', e.target.value)}
        />
        <input
          type="number"
          placeholder="До"
          value={maxPrice}
          onChange={(e) => onPriceChange('max', e.target.value)}
        />
      </div>
    </div>
  );
}

export default PriceFilter;