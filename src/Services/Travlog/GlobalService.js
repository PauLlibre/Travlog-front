import axios from "axios";

const GlobalService = {};

const baseUrl = "https://13.37.220.253:3000/search";
const shortUrl = "https://13.37.220.253:3000/";

GlobalService.getEverythingSorted = async (sort = "date") => {
  const results = await axios.get(baseUrl + "?order=" + sort);
  return results.data.data;
};

GlobalService.getRouteOrPostById = async (id) => {
  const results = await axios.get(baseUrl + "/" + id);
  return results.data.data;
};

GlobalService.getRouteOrPostByUserId = async (id, type) => {
  try {
    let results;
    switch (type) {
      case "route":
        results = await axios.get(shortUrl + `route/user/${id}`);
        return results.data.data;
      case "post":
        results = await axios.get(shortUrl + `post/user/${id}`);
        return results.data.data;
      case "all":
        results = await axios.get(shortUrl + `search/user/${id}?order=date`);
        return results.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default GlobalService;
