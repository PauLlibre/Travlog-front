export const isLoggedIn = () => {
  const user = localStorage.getItem("USER");

  if (user) return user;
  else return false;
};
