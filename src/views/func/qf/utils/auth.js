const tokenName = "stu-shop-qianfeng"

export function getToken() {
  return localStorage.getItem(tokenName);
}

export function setToken(token) {
  localStorage.setItem(tokenName, token);
}

export function clearToken() {
  localStorage.removeItem(tokenName);
}

export function isLogined() {
  if (localStorage.getItem(tokenName)) {
    return true;
  }
  return false;
}
