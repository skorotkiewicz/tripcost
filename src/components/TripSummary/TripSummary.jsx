import "./TripSummary.scss";
import CostIcon from "../../assets/icons/cost-icon.svg";
import DistanceIcon from "../../assets/icons/distance-icon.svg";
import TimeIcon from "../../assets/icons/time-icon.svg";
import FuelIcon from "../../assets/icons/fuel-icon.svg";

const TripSummary = ({ tripData }) => {
  if (!tripData) return null;

  const { distance, duration, fuelCost, fuelPrice, fuelConsumption } = tripData;

  // Format values for display
  const formatDistance = (meters) => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) {
      return `${minutes} min`;
    }

    return `${hours} h ${minutes} min`;
  };

  const formatCost = (cost) => {
    return `${cost.toFixed(2)}`;
  };

  const calculateFuelVolume = (distanceInMeters, consumptionPer100km) => {
    const distanceInKm = distanceInMeters / 1000;
    const fuelVolume = (distanceInKm * consumptionPer100km) / 100;
    return fuelVolume.toFixed(2);
  };

  const fuelVolume = calculateFuelVolume(distance, fuelConsumption);

  return (
    <div className="trip-summary">
      <h2>Trip Summary</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon distance-icon">
            <img src={DistanceIcon} alt="Distance Icon" />
          </div>
          <div className="card-content">
            <h3>Distance</h3>
            <p className="card-value">{formatDistance(distance)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon time-icon">
            <img src={TimeIcon} alt="Time Icon" />
          </div>
          <div className="card-content">
            <h3>Travel Time</h3>
            <p className="card-value">{formatDuration(duration)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon fuel-icon">
            <img src={FuelIcon} alt="Fuel Icon" />
          </div>
          <div className="card-content">
            <h3>Fuel Volume</h3>
            <p className="card-value">{fuelVolume} L</p>
            <p className="card-details">({fuelConsumption} L/100km)</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon cost-icon">
            <img src={CostIcon} alt="Cost Icon" />
          </div>
          <div className="card-content">
            <h3>Fuel Cost</h3>
            <p className="card-value">{formatCost(fuelCost)}</p>
            <p className="card-details">
              (Fuel price: {fuelPrice.toFixed(2)}/L)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
