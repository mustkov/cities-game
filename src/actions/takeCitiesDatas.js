import axios from "axios";
import {
  setFetchError,
  setIsFetching,
  setRepos,
} from "../reducers/reposReducer";

export const getRepository = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get("base/cities.json");
      console.log(response);
      dispatch(setRepos(response.data.city));
    } catch (e) {
      console.log(e, new Error("Ошибка запроса API"));
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
      setTimeout(() => {
        dispatch(setIsFetching(false));
      }, 100);
    }
  };
};
