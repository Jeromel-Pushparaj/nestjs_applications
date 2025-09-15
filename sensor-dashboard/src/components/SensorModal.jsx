import React, { useState, useEffect } from 'react';

// --- Add/Edit Modal Form ---
const SensorModal = ({ sensor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
  });

  // Pre-fill form if we are editing an existing sensor
  useEffect(() => {
    if (sensor) {
      setFormData({
        temperature: sensor.temperature,
        humidity: sensor.humidity,
      });
    }
  }, [sensor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.temperature || !formData.humidity) {
      alert('Please fill in both fields.');
      return;
    }
    onSave(formData);
  };

  const modalTitle = sensor ? 'Edit Sensor Reading' : 'Add New Sensor Reading';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{modalTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="temperature">Temperature (°C)</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="e.g., 23.5"
              step="0.1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="humidity">Humidity (%)</label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="e.g., 45.2"
              step="0.1"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SensorModal;