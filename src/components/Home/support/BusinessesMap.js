import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
const BusinessesMap = ({ businesses }) => {
  const history = useHistory();

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: businesses[0]?.lat ? parseFloat(businesses[0]?.lat) : 21.7679,
    lng: businesses[0]?.lng ? parseFloat(businesses[0]?.lng) : 78.8718,
  };

  const onSelect = (item) => {
    history.push(`/business/${item.id}`);
  };
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyDcOuFij8ydq4vGwIFEGE0P9qwad7OPDng">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {businesses.map((item) => {
            return (
              <Marker
                key={item.name}
                label={item.name}
                title={item.name}
                position={{
                  lat: parseFloat(item.lat),
                  lng: parseFloat(item.lng),
                }}
                onClick={() => onSelect(item)}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default BusinessesMap;
