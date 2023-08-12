import axios from "axios";

const auth = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/userdata", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return "Unauthorized";
  }
};

export default auth;
