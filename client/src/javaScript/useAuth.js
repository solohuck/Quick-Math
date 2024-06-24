import { useCallback, useEffect, useState, useRef } from "react";
import { getValidAuthToken } from "./auth";
import { set, trusted } from "mongoose";

const useAuth = () => {
  const [authToken, setAuthToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const hasFetchedToken = useRef(false);

  const fetchAuthToken = useCallback(async () => {
    const token = await getValidAuthToken();
    setAuthToken(token);
    setLoadingToken(false);
  }, []);

  useEffect(() => {
    if (!hasFetchedToken.current) {
      hasFetchedToken.current = true;
      fetchAuthToken();
    }
  }, [fetchAuthToken]);

  console.log(`Token found @ useAuth.js ${authToken}`);
  return { authToken, loadingToken };
};

export default useAuth;
