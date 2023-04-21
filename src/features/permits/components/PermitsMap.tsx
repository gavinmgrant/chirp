import { type FC } from "react";
import { usePermits } from "../hooks/usePermits";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapStyle } from "../utils/MapStyle";

const PermitsMap: FC = () => {
  const permits = usePermits();

  const containerStyle = {
    width: "100%",
    height: "calc(100% - 60px)",
  };

  const center = {
    lat: 37.73572,
    lng: -122.431297,
  };

  // loads in the map style from Snazzy Maps and removes the default Google Maps UI controls
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        {permits.map((permit, index) => {
          return (
            <div key={index} className="opacity-50">
              <Marker
                clickable
                icon={{
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/240px-Map_marker_font_awesome.svg.png",
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                position={{
                  lat: permit.lat,
                  lng: permit.lng,
                }}
              />
            </div>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default PermitsMap;
