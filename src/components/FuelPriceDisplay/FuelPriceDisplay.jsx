import "./FuelPriceDisplay.scss";

const FuelPriceDisplay = ({
  fuelPrices,
  onSelectFuelType,
  selectedFuelType,
}) => {
  if (!fuelPrices || fuelPrices.length === 0) return null;

  return (
    <div className="fuel-price-display">
      <h3>Current Fuel Prices</h3>
      <div className="fuel-types">
        {fuelPrices.map((fuel) => (
          <div
            key={fuel.type}
            className={`fuel-type ${selectedFuelType === fuel.type ? "selected" : ""}`}
            onClick={() => onSelectFuelType(fuel.type)}
          >
            <div className="fuel-name">{fuel.name}</div>
            <div className="fuel-price">{fuel.price.toFixed(2)}</div>
            <div className="fuel-station">{fuel.station}</div>
            {selectedFuelType === fuel.type && (
              <div className="selected-indicator" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelPriceDisplay;
