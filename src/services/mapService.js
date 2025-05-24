import axios from "axios";

// Helper function to encode the query parameters
const encodeQueryParams = (params) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
};

// Geocode an address to get coordinates
export const geocodeAddress = async (address) => {
  try {
    const params = {
      q: address,
      format: "json",
      limit: 1,
    };

    const response = await axios.get(
      `api/openstreetmap/search?${encodeQueryParams(params)}`,
    );

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: Number.parseFloat(location.lat),
        lon: Number.parseFloat(location.lon),
        name: location.display_name,
      };
    }

    throw new Error(`Could not find location: ${address}`);
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

// Get route between two points, optionally through a waypoint
export const getRoute = async (start, destination, waypoint = null) => {
  try {
    const waypoints = [];

    // Start point
    const startPoint = await geocodeAddress(start);
    waypoints.push([startPoint.lon, startPoint.lat]);

    // Waypoint if provided
    let waypointPoint = null;
    if (waypoint) {
      waypointPoint = await geocodeAddress(waypoint);
      waypoints.push([waypointPoint.lon, waypointPoint.lat]);
    }

    // Destination point
    const destinationPoint = await geocodeAddress(destination);
    waypoints.push([destinationPoint.lon, destinationPoint.lat]);

    // Prepare waypoints string for the API
    const waypointsStr = waypoints.map((point) => point.join(",")).join(";");

    // Get route from OSRM
    const response = await axios.get(
      `api/osrm/route/v1/driving/${waypointsStr}?overview=full&geometries=geojson`,
    );

    if (response.data?.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const coordinates = route.geometry.coordinates.map((coord) => [
        coord[1],
        coord[0],
      ]);

      // Create markers for all points
      const markers = [
        { ...startPoint, name: start },
        ...(waypointPoint ? [{ ...waypointPoint, name: waypoint }] : []),
        { ...destinationPoint, name: destination },
      ];

      // Calculate bounds for the map
      const bounds = [
        [
          Math.min(...markers.map((marker) => marker.lat)),
          Math.min(...markers.map((marker) => marker.lon)),
        ],
        [
          Math.max(...markers.map((marker) => marker.lat)),
          Math.max(...markers.map((marker) => marker.lon)),
        ],
      ];

      return {
        coordinates,
        distance: route.distance,
        duration: route.duration,
        markers,
        bounds,
      };
    }

    throw new Error("Could not calculate route");
  } catch (error) {
    console.error("Routing error:", error);
    throw error;
  }
};
