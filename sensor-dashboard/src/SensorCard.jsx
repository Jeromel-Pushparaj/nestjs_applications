import React from 'react';

// --- Sensor Data Display Card ---
const SensorCard = ({ sensor, onEdit, onDelete }) => {
  // Format date for better readability
  const formattedDate = new Date(sensor.data_time).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="sensor-card">
      <div className="sensor-data">
        <div className="data-point">
          <span className="data-label">Temperature</span>
          <span className="data-value">{parseFloat(sensor.temperature).toFixed(1)}°C</span>
        </div>
        <div className="data-point">
          <span className="data-label">Humidity</span>
          <span className="data-value">{parseFloat(sensor.humidity).toFixed(1)}%</span>
        </div>
      </div>
      <div className="card-footer">
        <p className="timestamp">Last updated: {formattedDate}</p>
        <div className="card-actions">
          <button onClick={onEdit} className="action-btn edit-btn">Edit</button>
          <button onClick={onDelete} className="action-btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;