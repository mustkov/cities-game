import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRepository } from "./actions/takeCitiesDatas";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(getRepository());
  }, []);

  return (
    <div className="App">
      <header>
        <span>Игра в города</span>
      </header>
        <div className="input-group mb-3 md">
          <input
            type="text"
            className="form-control"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div>
        <p>Введённый Вами город: </p>
        {/* <p>{state.city}</p> */}
        <p>Город компьютера: </p>
        {/* {state.randomConfirmCity ? <p>{state.randomConfirmCity.name}</p> : null} */}
      
    </div>
  );
}

export default App;
