const SET_REPOS = "SET_REPOS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_FETCH_ERROR = "SET_FETCH_ERROR";

const defaultState = {
  value: "Привет",
  startBaseCities: [],
  isFetching: true,
  isFetchError: false,
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
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
