import React from 'react';
import './levelfilter.css';

function LevelFilter({ selectedLevels, onLevelChange }) {
  const levels = ['Для начинающих', 'Для продолжающих', 'Для продвинутых', 'Для всех'];

  return (
    <div className="level-filter">
      <h3>Уровень сложности</h3>
      {levels.map(level => (
        <label key={level} className="level-checkbox">
          <input
            type="checkbox"
            checked={selectedLevels.includes(level)}
            onChange={() => onLevelChange(level)}
          />
          {level}
        </label>
      ))}
    </div>
  );
}

export default LevelFilter;