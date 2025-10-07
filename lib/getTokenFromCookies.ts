import Cookies from "universal-cookie";

export const getTokenFromCookies = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return token?.token || token || null;
};
