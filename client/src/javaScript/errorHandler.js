export const handleError = (error) => {
  if (!error.res) {
    return "Network error. Please try again later";
  }

  switch (error.response.status) {
    case 400:
      return "Bad request. Please check your input";
    case 401:
      return "Unauthorized. Please log in";
    case 403:
      return "Forbidden. You do not have promission to access this resource";
    case 404:
      return "Resource not found";
    case 500:
    default:
      return "Internal server error. Please try again later";
  }
};
