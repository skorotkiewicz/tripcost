import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RouteForm from "./components/RouteForm/RouteForm";
import MapMap from "./components/Map/Map";
import TripSummary from "./components/TripSummary/TripSummary";
import FuelPriceDisplay from "./components/FuelPriceDisplay/FuelPriceDisplay";
import { getRoute } from "./services/mapService";
import { fetchFuelPrices, calculateFuelCost } from "./services/fuelService";

function App() {
  const [fuelPrices, setFuelPrices] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState("gasoline95");
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch fuel prices on component mount
  useEffect(() => {
    const loadFuelPrices = async () => {
      try {
        const prices = await fetchFuelPrices();
        setFuelPrices(prices);
        // Set default selected fuel type if not already set
        if (!selectedFuelType && prices.length > 0) {
          setSelectedFuelType(prices[0].type);
        }
      } catch (err) {
        setError("Failed to load fuel prices. Please try again later.");
        console.error(err);
      }
    };

    loadFuelPrices();
  }, []);

  const handleRouteSubmit = async (routeData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the selected fuel price
      const selectedFuel = fuelPrices.find(
        (fuel) => fuel.type === selectedFuelType,
      );

      if (!selectedFuel) {
        throw new Error("Please select a fuel type first.");
      }

      // Calculate the route
      const routeResult = await getRoute(
        routeData.start,
        routeData.destination,
        routeData.waypoint,
      );

      setRoute(routeResult);

      // Calculate fuel cost based on distance and consumption
      const fuelCost = calculateFuelCost(
        routeResult.distance,
        routeData.fuelConsumption,
        selectedFuel.price,
      );

      // Set trip data with all necessary information
      setTripData({
        distance: routeResult.distance,
        duration: routeResult.duration,
        fuelConsumption: routeData.fuelConsumption,
        fuelPrice: selectedFuel.price,
        fuelCost: fuelCost,
      });
    } catch (err) {
      setError(err.message || "An error occurred while calculating the route.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFuelType = (fuelType) => {
    setSelectedFuelType(fuelType);

    // If we already have trip data, recalculate fuel cost
    if (tripData && route) {
      const selectedFuel = fuelPrices.find((fuel) => fuel.type === fuelType);

      if (selectedFuel) {
        const fuelCost = calculateFuelCost(
          route.distance,
          tripData.fuelConsumption,
          selectedFuel.price,
        );

        setTripData({
          ...tripData,
          fuelPrice: selectedFuel.price,
          fuelCost: fuelCost,
        });
      }
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="app-section">
          <h2 className="section-title">Calculate Your Trip Cost</h2>
          <p className="section-description">
            Enter your starting point, destination, and optionally a waypoint to
            calculate the distance, travel time, and fuel costs for your
            journey.
          </p>

          <div className="app-content">
            <div className="left-column">
              <RouteForm
                onRouteSubmit={handleRouteSubmit}
                isLoading={isLoading}
              />

              <FuelPriceDisplay
                fuelPrices={fuelPrices}
                selectedFuelType={selectedFuelType}
                onSelectFuelType={handleSelectFuelType}
              />
            </div>

            <div className="right-column">
              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}

              <MapMap route={route} isLoading={isLoading} />

              {tripData && <TripSummary tripData={tripData} />}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
