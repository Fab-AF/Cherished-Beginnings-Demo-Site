import { parseRoles } from "./staticData";

export const storageKey = "CHERISHED_BEGINNINGS_TOKEN";

export const  DOULA_FILTER = "DOULA_FILTER_KEY";

export const checkLogin = () => {
  if (typeof window !== "undefined") {
    !!localStorage.getItem(storageKey);
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(storageKey);
  }
};

export const setAuthToken = (token = "") => {
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, token);
  }
};

export const getLocalStore = (name) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(name);
  }
};

export const setLocalStore = (name, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(name, data);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(storageKey);
  }
};

export const clearLocalStore = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

export const getUserRole = () => {
  const storedUser = getLocalStore("user");
  if (!storedUser) {
    return 0; 
  }

  try {
    const user = JSON.parse(storedUser);
    return parseRoles[user?.type];
  } catch (error) {
    return 0; 
  }
}

export const getQueryParams = ()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlParams.entries());
  return params;
}

export const setCookie = (name, value) => {
  document.cookie = name + '=' + value + ';' + ';path=/';
};

export const getCookie = (name) => {
  const cookieName = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
};

export const removeCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};