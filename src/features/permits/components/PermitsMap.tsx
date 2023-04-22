import { type FC, useState } from "react";
import { usePermits } from "../hooks/usePermits";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapStyle } from "../utils/MapStyle";
import PermitModal from "~/features/permits/components/PermitModal";

const PermitsMap: FC = () => {
  const permits = usePermits();
  const [modalOpen, setModalOpen] = useState(false);
  const [permitId, setPermitId] = useState("");

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
      <PermitModal id={permitId} open={modalOpen} setOpen={setModalOpen} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        {permits.map((permit, index) => {
          return (
            <Marker
              key={index}
              clickable
              icon="https://api.iconify.design/ic:round-location-on.svg?width=32&height=32"
              position={{
                lat: permit.lat,
                lng: permit.lng,
              }}
              onClick={() => {
                setModalOpen(true);
                setPermitId(permit.permitNumber);
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default PermitsMap;
