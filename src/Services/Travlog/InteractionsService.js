import axios from "axios";

const InteractionsService = {};

const baseUrl = "http://localhost:3000/route/";

InteractionsService.makeComment = async (post_id, user_id, content) => {
  console.log(content);
  console.log(post_id);
  console.log(user_id);
  const res = await axios.post(baseUrl + post_id + "/user/" + user_id, {
    content: content,
  });
  console.log(res);
};

export default InteractionsService;
