import axios from "axios";

const UserService = {};

const baseUrl = "https://13.37.220.253:3000/user";

UserService.getUserById = async (id) => {
  const data = await axios.get(baseUrl + "/" + id);
  return data.data.data;
};

UserService.modifyUser = async (id, details) => {
  const data = await axios.patch(baseUrl + "/" + id, details);
  return data.data;
};

UserService.getAllUsers = async (token) => {
  const res = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res;
};

UserService.deleteById = async (token, id) => {
  const res = await axios.delete(baseUrl + "/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
};

export default UserService;
