import axios from "axios";

const baseUrl = "http://localhost:8081/api"; // Replace with your backend app URL

export const fetchModel = async (url) => {
  try {
    const response = await axios.get(`${baseUrl}/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching model data:", error);
    // Handle error gracefully, e.g., display an error message to the user
    throw error; // Re-throw the error for handling in the component
  }
};

export default fetchModel;
