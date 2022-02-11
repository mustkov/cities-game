const SET_REPOS = "SET_REPOS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_FETCH_ERROR = "SET_FETCH_ERROR";
const SET_CITY = "SET_CITY";
const SET_DONE_CITIES = "SET_DONE_CITIES";
const SET_LAST_LETTER = "SET_LAST_LETTER";
const SET_NEW_CITY = "SET_NEW_CITY";

const defaultState = {
  city: "",
  startBaseCities: [],
  isFetching: true,
  isFetchError: false,
  doneCities: [],
  lastLetter: "",
  newCity: "",
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_NEW_CITY:
      return {
        ...state,
        newCity: action.payload,
      };
    case SET_DONE_CITIES:
      return {
        ...state,
        doneCities: action.payload,
      };
    case SET_LAST_LETTER:
      return {
        ...state,
        lastLetter: action.payload,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    case SET_REPOS:
      return {
        ...state,
        startBaseCities: action.payload,
      };
    default:
      return state;
  }
}

export const setRepos = (repos) => ({
  type: SET_REPOS,
  payload: repos,
});
export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
export const setFetchError = (bool) => ({
  type: SET_FETCH_ERROR,
  payload: bool,
});
export const setDoneCities = (city) => ({
  type: SET_DONE_CITIES,
  payload: city,
});
export const setLastLetter = (symbol) => ({
  type: SET_LAST_LETTER,
  payload: symbol,
});
export const setNewCity = (city) => ({
  type: SET_NEW_CITY,
  payload: city,
});
