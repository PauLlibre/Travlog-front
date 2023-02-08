import axios from "axios";

const InteractionsService = {};

const baseUrl = "http://localhost:3000/route/";

InteractionsService.makeComment = async (post_id, user_id, content) => {
  const res = await axios.post(baseUrl + post_id + "/user/" + user_id, {
    content: content,
  });
  console.log(res);
};

export default InteractionsService;
