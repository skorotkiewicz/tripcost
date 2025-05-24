// mock service

// sleep
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock fuel price data
const mockFuelPrices = [
  {
    type: "gasoline95",
    name: "Gasoline 95",
    price: 5.49,
    station: "Shell",
  },
  {
    type: "gasoline98",
    name: "Gasoline 98",
    price: 5.79,
    station: "BP",
  },
  {
    type: "diesel",
    name: "Diesel",
    price: 5.29,
    station: "Orlen",
  },
  {
    type: "lpg",
    name: "LPG",
    price: 2.49,
    station: "Circle K",
  },
];

// Function to simulate fetching fuel prices
export const fetchFuelPrices = async () => {
  try {
    await delay(1000);

    // return await axios.get('https://api.fuelprice.com/prices');

    return mockFuelPrices;
  } catch (error) {
    console.error("Error fetching fuel prices:", error);
    // Return default prices in case of error
    return mockFuelPrices;
  }
};

// Calculate fuel cost based on distance and consumption
export const calculateFuelCost = (
  distanceInMeters,
  fuelConsumptionPer100km,
  fuelPricePerLiter,
) => {
  const distanceInKm = distanceInMeters / 1000;
  const fuelNeededLiters = (distanceInKm * fuelConsumptionPer100km) / 100;
  const cost = fuelNeededLiters * fuelPricePerLiter;

  return cost;
};
