import axios from "axios";

const GlobalService = {};

const baseUrl = "http://localhost:3000/search?order=";

GlobalService.getEverythingSorted = async (sort = "date") => {
  const results = await axios.get(baseUrl + sort);
  return results.data.data;
};

export default GlobalService;
