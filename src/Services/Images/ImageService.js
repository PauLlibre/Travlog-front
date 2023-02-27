import axios from "axios";

const ImageService = {};

const baseUrl =
  "https://api.unsplash.com/search/photos?client_id=fJarIHxQjk7Sbx9NtLJ4PB1dGw8wuQ38JzyCxioByZQ&page=1&per_page=1&query=";

ImageService.getImage = async (title) => {
  const res = await axios.get(baseUrl + title);
  console.log(res.data.results[0]);
  return res.data.results[0].urls.regular;
};

export default ImageService;
