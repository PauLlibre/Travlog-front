import axios from "axios";

const GlobalService = {};

const baseUrl = "http://localhost:3000/search";

GlobalService.getEverythingSorted = async (sort = "date") => {
  const results = await axios.get(baseUrl + "?order=" + sort);
  return results.data.data;
};

GlobalService.getRouteOrPostById = async (id) => {
  const results = await axios.get(baseUrl + "/" + id);
  return results.data.data;
};

export default GlobalService;
