import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";
import markerIcon2x from "../../assets/images/marker-icon-2x.png";
import markerIcon from "../../assets/images/marker-icon.png";
import markerShadow from "../../assets/images/marker-shadow.png";

// Fix for default marker icons in Leaflet with React
// biome-ignore lint/performance/noDelete: <explanation>
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Component to fit map to route bounds
const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

// Component to draw the route on the map
const RouteLayer = ({ route }) => {
  const map = useMap();
  const routeLayerRef = useRef(null);

  useEffect(() => {
    if (route?.coordinates) {
      // Remove previous route layer if exists
      if (routeLayerRef.current) {
        routeLayerRef.current.removeFrom(map);
      }

      // Create new route layer
      const routeLayer = L.polyline(route.coordinates, {
        color: "#1976D2",
        weight: 5,
        opacity: 0.7,
        lineJoin: "round",
      });

      routeLayer.addTo(map);
      routeLayerRef.current = routeLayer;

      return () => {
        if (routeLayerRef.current) {
          routeLayerRef.current.removeFrom(map);
        }
      };
    }
  }, [route, map]);

  return null;
};

const MapMap = ({ route, isLoading }) => {
  const defaultCenter = [52.2297, 21.0122]; // Warsaw, as a default center
  const defaultZoom = 5;

  if (isLoading) {
    return (
      <div className="map-container loading">
        <div className="loading-indicator">
          <div className="loading-spinner" />
          <p>Loading route...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {route?.markers?.map((marker, index) => (
          <Marker key={`marker-${index}`} position={[marker.lat, marker.lon]}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}

        {route?.coordinates && (
          <>
            <RouteLayer route={route} />
            <FitBounds bounds={route.bounds} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapMap;
