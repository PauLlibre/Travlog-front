import { MarkerClusterer } from "@react-google-maps/api";
import React from "react";
import { useDispatch } from "react-redux";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { add } from "../../Features/routeCreation";

export default function Places({ setSelected, setMarkers }) {
  const dispatch = useDispatch();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address, place_id) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    console.log(results);
    const { lat, lng } = await getLatLng(results[0]);
    console.log(lat, lng);
    setSelected({ lat, lng });
    setMarkers((currentMarkers) => [...currentMarkers, { lat, lng, place_id }]);
    dispatch(add({ lat, lng, place_id }));
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search an address"
      />
      {status === "OK" &&
        data.map(({ place_id, description }) => (
          <div
            onClick={() => handleSelect(description, place_id)}
            key={place_id}
          >
            {description}
          </div>
        ))}
    </>
  );
}
