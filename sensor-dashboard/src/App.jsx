import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SensorCard from './components/SensorCard.jsx';
import SensorModal from './components/SensorModal.jsx';

// --- Main App Component ---
function App() {
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null); // null for 'Add', sensor object for 'Edit'

  // --- API Functions ---
  const API_BASE_URL = '/sensors'; // Using proxy, so no need for full URL

  const fetchSensors = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Something went wrong fetching data!');
      }
      const data = await response.json();
      setSensors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);


  // --- Event Handlers ---

  const handleOpenModalToAdd = () => {
    setEditingSensor(null);
    setIsModalOpen(true);
  };

  const handleOpenModalToEdit = (sensor) => {
    setEditingSensor(sensor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSensor(null);
  };

  const handleSaveSensor = async (sensorData) => {
    const isEditing = !!editingSensor;
    const url = isEditing ? `${API_BASE_URL}/${editingSensor.id}` : API_BASE_URL;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sensorData,
          data_time: new Date().toISOString(), // Set current time on save
        }),
      });

      if (!response.ok) throw new Error('Failed to save sensor data.');

      // Refresh data from server to get the latest state
      await fetchSensors();

    } catch (err) {
      setError(err.message);
    } finally {
      handleCloseModal();
    }
  };

  const handleDeleteSensor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sensor reading?")) {
        return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete sensor.');
      // Optimistic UI update
      setSensors(prevSensors => prevSensors.filter(sensor => sensor.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };


  // --- Render Logic ---
  let content = <p className="info-text">No sensor data found. Add one to get started!</p>;

  if (sensors.length > 0) {
    content = (
      <div className="sensor-grid">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            sensor={sensor}
            onEdit={() => handleOpenModalToEdit(sensor)}
            onDelete={() => handleDeleteSensor(sensor.id)}
          />
        ))}
      </div>
    );
  }

  if (error) {
    content = <p className="info-text error">{error}</p>;
  }

  if (isLoading) {
    content = <p className="info-text">Loading sensor data...</p>;
  }

useEffect(() => {
  fetchSensors();
  const interval = setInterval(fetchSensors, 5000);
  return () => clearInterval(interval);
}, [fetchSensors]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sensor Dashboard 🌡️</h1>
        <button className="add-button" onClick={handleOpenModalToAdd}>
          + Add Reading
        </button>
      </header>

      <main>
        {content}
      </main>

      {isModalOpen && (
        <SensorModal
          sensor={editingSensor}
          onClose={handleCloseModal}
          onSave={handleSaveSensor}
        />
      )}
    </div>
  );
}

export default App;