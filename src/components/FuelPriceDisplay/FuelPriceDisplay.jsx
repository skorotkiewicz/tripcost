import { useState } from "react";
import "./FuelPriceDisplay.scss";

const FuelPriceDisplay = ({
  fuelPrices,
  onSelectFuelType,
  selectedFuelType,
  onCustomPriceChange,
}) => {
  const [showCustomPrice, setShowCustomPrice] = useState(false);
  const [customPrice, setCustomPrice] = useState("");

  const handleCustomPriceChange = (e) => {
    const value = e.target.value;
    setCustomPrice(value);
    onCustomPriceChange(Number.parseFloat(value) || 0);
  };

  // const handleFuelTypeSelect = (type) => {
  //   setShowCustomPrice(false);
  //   onSelectFuelType(type);
  // };

  const handleCustomPriceClick = () => {
    setShowCustomPrice(true);
    onSelectFuelType("custom");
  };

  if (!fuelPrices || fuelPrices.length === 0) return null;

  return (
    <div className="fuel-price-display">
      <h3>Current Fuel Prices</h3>
      <div className="fuel-types">
        {/* {fuelPrices.map((fuel) => (
          <div
            key={fuel.type}
            className={`fuel-type ${selectedFuelType === fuel.type ? "selected" : ""}`}
            onClick={() => handleFuelTypeSelect(fuel.type)}
          >
            <div className="fuel-name">{fuel.name}</div>
            <div className="fuel-price">{fuel.price.toFixed(2)}</div>
            <div className="fuel-station">{fuel.station}</div>
            {selectedFuelType === fuel.type && (
              <div className="selected-indicator" />
            )}
          </div>
        ))} */}

        <div
          className={`fuel-type custom-price ${selectedFuelType === "custom" ? "selected" : ""}`}
          onClick={handleCustomPriceClick}
        >
          {!showCustomPrice ? (
            <>
              <div className="fuel-name">Custom Price</div>
              <div className="fuel-price">Set your own</div>
            </>
          ) : (
            <>
              <div className="fuel-name">Custom Price</div>
              <input
                type="number"
                value={customPrice}
                onChange={handleCustomPriceChange}
                placeholder="Enter price"
                step="0.01"
                min="0"
                autoFocus
                className="custom-price-input"
              />
            </>
          )}
          {selectedFuelType === "custom" && (
            <div className="selected-indicator" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FuelPriceDisplay;
