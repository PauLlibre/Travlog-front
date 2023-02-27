import getTimeDifference from "./timeDifference";

const routeInfoFunctions = {};

routeInfoFunctions.hasRestaurant = (route) => {
  for (const leg of route.route_description) {
    try {
      if (leg.placeType.includes("restaurant")) {
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
};

routeInfoFunctions.fullDuration = (route) => {
  let fullDuration = 0;

  fullDuration += route.duration;
  route.route_description.map((leg) => {
    if (leg.time > 0) {
      fullDuration += leg.time * 60;
    } else if (leg.duration) {
      fullDuration += leg.duration;
    } else if (!leg.time) {
      fullDuration = fullDuration;
    }
  });
  const duration = getTimeDifference.ByValue(fullDuration);
  return duration;
};

export default routeInfoFunctions;
