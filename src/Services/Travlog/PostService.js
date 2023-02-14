import axios from "axios";

const PostService = {};

const baseUrl = "http://localhost:3000/";

PostService.makePost = async (
  id,
  type,
  title,
  description,
  map,
  city,
  route,
  duration
) => {
  const details = {
    user_id: id,
    title,
    description,
    map,
    city,
    route_description: route.details,
    duration,
  };

  console.log(details);

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

PostService.updatePost = async (details, type, id) => {
  try {
    let res;
    console.log(type);
    console.log(id);
    console.log(details);
    switch (type) {
      case "post":
        res = await axios.patch(baseUrl + "post/" + id, details);
        console.log(res);
        return res;
      case "route":
        res = await axios.patch(baseUrl + "route/" + id, details);
        console.log(res);
        return res;
    }
  } catch (error) {
    console.log(error);
  }
};

PostService.deletePost = async (id, type) => {
  try {
    let res;
    console.log(id);
    console.log(type);
    switch (type) {
      case "post":
        res = await axios.delete(baseUrl + `post/${id}`);
        return res;
      case "route":
        res = await axios.delete(baseUrl + `route/${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default PostService;
