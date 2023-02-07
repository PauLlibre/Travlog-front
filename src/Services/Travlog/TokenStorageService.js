const TOKEN_KEY = "auth-token";

const TokenStorageService = {};

TokenStorageService.logOut = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("USER");
};

TokenStorageService.saveToken = (token) => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_KEY, token);
};

TokenStorageService.saveLoggedUser = (user_details) => {
  localStorage.setItem("USER", user_details);
};

TokenStorageService.getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export default TokenStorageService;
