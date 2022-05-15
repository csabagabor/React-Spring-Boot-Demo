import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const UserDataService = (keyword) => {
  try {
    return axios.get("http://localhost:8081/articles", {
      params: {
        keyword,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UserDataService;
