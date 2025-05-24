import { useState } from "react";
import "./RouteForm.scss";

const RouteForm = ({ onRouteSubmit, isLoading }) => {
  const [locations, setLocations] = useState({
    start: "",
    destination: "",
    waypoint: "",
  });
  const [fuelConsumption, setFuelConsumption] = useState(7);
  const [waypointVisible, setWaypointVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFuelConsumptionChange = (e) => {
    setFuelConsumption(Number.parseFloat(e.target.value));
  };

  const toggleWaypoint = () => {
    setWaypointVisible(!waypointVisible);
    if (!waypointVisible) {
      // Reset waypoint value when hiding
      setLocations((prev) => ({ ...prev, waypoint: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { start, destination, waypoint } = locations;

    if (!start || !destination) return;

    const route = {
      start,
      destination,
      waypoint: waypointVisible ? waypoint : null,
      fuelConsumption,
    };

    onRouteSubmit(route);
  };

  return (
    <div className="route-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start">Starting Point</label>
          <input
            type="text"
            id="start"
            name="start"
            value={locations.start}
            onChange={handleChange}
            placeholder="City or address"
            required
          />
        </div>

        {waypointVisible && (
          <div className="form-group waypoint-group">
            <label htmlFor="waypoint">Via (Optional)</label>
            <input
              type="text"
              id="waypoint"
              name="waypoint"
              value={locations.waypoint}
              onChange={handleChange}
              placeholder="Waypoint city or address"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={locations.destination}
            onChange={handleChange}
            placeholder="City or address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fuelConsumption">Fuel Consumption (L/100km)</label>
          <input
            type="number"
            id="fuelConsumption"
            name="fuelConsumption"
            value={fuelConsumption}
            onChange={handleFuelConsumptionChange}
            step="0.1"
            min="1"
            max="30"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={toggleWaypoint}
          >
            {waypointVisible ? "Remove Waypoint" : "Add Waypoint"}
          </button>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Calculating..." : "Calculate Route"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RouteForm;
