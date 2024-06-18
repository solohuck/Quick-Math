import { useEffect, useState } from "react";
import { getValidAuthToken } from "./auth";

const useAuth = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await getValidAuthToken();
      setAuthToken(token);
    };

    fetchAuthToken();
  }, []);

  return authToken;
};

export default useAuth;
