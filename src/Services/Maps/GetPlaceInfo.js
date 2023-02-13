const GetPlaceInfo = {};

GetPlaceInfo.getByMarker = (placeId, callback) => {
  if (placeId) {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      placeId: placeId,
    };

    service.getDetails(request, (result, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (callback && typeof callback === "function") {
          callback(result);
        }
      } else {
        console.error(`Error: ${status}`);
      }
    });
  }
};

export default GetPlaceInfo;
