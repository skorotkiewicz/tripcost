# Fuel Cost Calculator

## 📋 Overview
A modern web application for calculating fuel costs for your trips. Plan your route, calculate the distance, and estimate your fuel expenses - all in one place.

## ✨ Features
- **Route Planning**: Set starting point, destination, and optional waypoints
- **Interactive Map**: View your route on an interactive map powered by Leaflet
- **Fuel Cost Estimation**: Calculate costs based on distance, fuel consumption, and current fuel prices
- **Trip Summary**: Get detailed information about distance, travel time, fuel volume, and total cost
- **Multiple Fuel Types**: Support for different fuel types and custom fuel prices

## 🛠️ Technologies
- **React**: Modern, component-based UI library
- **Leaflet & react-leaflet**: Interactive map components
- **Axios**: HTTP client for API requests
- **SASS**: Advanced CSS preprocessing
- **Vite**: Next-generation frontend build tool

## 🖥️ Installation

### Prerequisites
- Node.js (v18+)
- npm or bun

### Setup
1. Clone the repository
```bash
git clone https://github.com/skorotkiewicz/tripcost
cd tripcost
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage
1. Enter your starting location
2. Add your destination 
3. (Optional) Add waypoints for more complex routes
4. Enter your vehicle's fuel consumption (liters per 100km)
5. Select your fuel type
6. Click "Calculate" to see your results
7. View your route on the map and detailed cost breakdown

## 📊 API Integrations
- **OpenStreetMap/Nominatim**: For geocoding (converting addresses to coordinates)
- **OSRM (Open Source Routing Machine)**: For route calculation and distance/time estimation

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors
- [S.Korotkiewicz](https://github.com/skorotkiewicz)

## 🤝 Acknowledgements
- [Leaflet](https://leafletjs.com/) for the amazing mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) for providing the map data
- [OSRM](http://project-osrm.org/) for the routing engine