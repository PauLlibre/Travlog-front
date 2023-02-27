import axios from "axios";

const InteractionsService = {};

const baseUrl = "https://13.37.220.253:3000/route/";

InteractionsService.makeComment = async (post_id, user_id, content) => {
  const res = await axios.post(baseUrl + post_id + "/user/" + user_id, {
    content: content,
  });
  console.log(res);
};

InteractionsService.like = async (route_id, user_id) => {
  const rating = {
    user_id,
    rating: "+",
  };
  try {
    const res = await axios.post(baseUrl + route_id + "/like", rating);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default InteractionsService;
