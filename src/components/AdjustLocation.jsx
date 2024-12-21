import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

const AdjustLocation = ({ initialLocation, onLocationChange, showDialog, setShowDialog }) => {
  const [location, setLocation] = useState(initialLocation || { lat: 0, lng: 0 });
  const [googleApi, setGoogleApi] = useState(null);

  useEffect(() => {
    if (showDialog && googleApi) {
      const mapElement = document.getElementById("google-map");
      if (!mapElement) return;

      const map = new googleApi.maps.Map(mapElement, {
        center: location,
        zoom: 15,
      });

      const marker = new googleApi.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });

      const handleDragEnd = (event) => {
        const newLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setLocation(newLocation);
      };

      marker.addListener("dragend", handleDragEnd);

      return () => {
        googleApi.maps.event.clearListeners(marker, "dragend");
      };
    }
  }, [showDialog, googleApi, location]);

  useEffect(() => {
    if (showDialog && !googleApi) {
      const loader = new GoogleMapsLoader({
        apiKey: "hggugu",
        version: "weekly",
      });

      loader
        .load()
        .then((google) => {
          setGoogleApi(google);
        })
        .catch((error) => console.error("Error loading map:", error));
    }
  }, [showDialog, googleApi]);

  const handleSave = () => {
    onLocationChange(location);
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>Adjust Your Location</DialogTitle>
        <div id="google-map" className="w-full h-96 mt-4"></div>
        <div className="flex justify-end mt-4">
          <Button
          variant={"outline"}
            className="btn btn-outline"
            onClick={() => setShowDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="btn ml-4" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

AdjustLocation.propTypes = {
  initialLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  onLocationChange: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
};

export default AdjustLocation;
