import React from 'react';
import './pricefilter.css';

function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
  return (
    <div className="price-filter">
      <h3>Цена</h3>
      <div className="price-inputs">
        <div className="price-text"><p>от</p></div>
        <input
          type="number"
          placeholder="0"
          value={minPrice}
          onChange={(e) => onPriceChange('min', e.target.value)}
        />
        <div className="price-text"><p>до</p></div>
        <input
          type="number"
          placeholder="250 000"
          value={maxPrice}
          onChange={(e) => onPriceChange('max', e.target.value)}
        />
      </div>
    </div>
  );
}

export default PriceFilter;