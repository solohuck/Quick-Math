import axiosInstance from "./axiosInstance"; // Import axiosInstance instead of axios

// Function to get the auth token from sessionStorage
export function getAuthToken() {
  return sessionStorage.getItem("authToken");
}

// function to set the auth token in sessionStorage
export function setAuthToken(token) {
  if (token) {
    sessionStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Use axiosInstance here
  } else {
    sessionStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.common["Authorization"]; // Use axiosInstance here
  }
}

// Function to check if the token is expired
export function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp < Date.now() / 1000;
}

// Function to refresh the auth token
export async function refreshAuthToken() {
  console.log("Cookies:", document.cookie);

  const refreshTokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="));

  if (!refreshTokenCookie) {
    console.error("No refresh token found");
    return null;
  }

  const refreshToken = refreshTokenCookie.split("=")[1];
  console.log("parsed refresh token:", refreshToken);

  try {
    const res = await axiosInstance.post("/api/token", { refreshToken }); // Use axiosInstance here
    setAuthToken(res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error("Error refreshing auth token:", error);
    // handle error, possibly redirect to login page
    return null;
  }
}

// Function to get a valid auth token, refreshing if necessary
export async function getValidAuthToken() {
  let authToken = getAuthToken();
  if (!authToken || isTokenExpired(authToken)) {
    authToken = await refreshAuthToken();
  } else {
    console.log(`Token found: ${authToken} `);
  }

  return authToken;
}
