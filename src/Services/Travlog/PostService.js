import axios from "axios";

const PostService = {};

const baseUrl = "http://localhost:3000/";

PostService.makePost = async (id, type, title, description, map, city) => {
  const details = {
    user_id: id,
    title,
    description,
    map,
    city,
  };

  let res = "";
  try {
    switch (type) {
      case "post":
        res = await axios.post(baseUrl + "post", details);
        return res;

      case "route":
        res = await axios.post(baseUrl + "route", details);
        return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export default PostService;
