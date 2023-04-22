import axios from "axios";

const URL: string = import.meta.env.VITE_API_URL_BASE;
const URL_YOUTUBE: string = import.meta.env.VITE_API_URL_BASE_YOUTUBE;
const TOKEN: string = import.meta.env.VITE_API_URL_KEY;
const TOKEN_YOUTUBE: string = import.meta.env.VITE_API_URL_KEY_YOUTUBE;
export const getRequestVideoMovie = async (endpoint: string) => {
  try {
    const { data } = await axios.get(
      URL_YOUTUBE + endpoint + "&" + TOKEN_YOUTUBE + "&language=es-Es"
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
export const getRequest = async (endpoint: string) => {
  try {
    const { data } = await axios.get(URL + endpoint + "?" + TOKEN + "&language=es-Es&region=ar", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
export const getImages = async (endpoint: string) => {
  try {
    const { data } = await axios.get(URL + endpoint + "?" + TOKEN, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
export const getMoviesWithParams = async (endpoint: string) => {
  try {
    const { data } = await axios.get(URL + endpoint + "&" + TOKEN + "&language=es-Es&region=ar", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
