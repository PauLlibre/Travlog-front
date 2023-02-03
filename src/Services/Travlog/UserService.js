import axios from "axios";

const UserService = {};

const baseUrl = "http://localhost:3000/user";

UserService.getUserById = async (id) => {
  const data = await axios.get(baseUrl + "/" + id);
  return data.data.data;
};

export default UserService;
