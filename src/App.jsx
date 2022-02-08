import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRepository } from "./actions/takeCitiesDatas";
import "./App.scss";
import { setCurrentCity_Redux, setDoneCities } from "./reducers/reposReducer";

function App() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos);
  const doneCities = useSelector((state) => state.repos.doneCities);
  const doneCity = useSelector((state) => state.repos.city);

  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(getRepository());
  }, []);

  const inputChange = (e) => {
    setCurrentCity(e.target.value);
  }

  const buttonClick = () => {
    dispatch(setCurrentCity_Redux(city));
    arrayDoneCities()
  }

  const arrayDoneCities = () => {
    if(!doneCities.includes(doneCity)) {
      dispatch(setDoneCities(doneCity))
    } else {
      alert('Такой город уже был!')
    }
  }

  const setCurrentCity = (value) => {
    setCity(value)
  }

  return (
    <div className="App">
      <header>
        <span>Игра в города</span>
      </header>
        <form className="input-group mb-3 md" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            aria-describedby="button-addon2"
            onChange={(e) => inputChange(e)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            onClick={buttonClick}
          >
            Button
          </button>
        </form>
        <p>Введённый Вами город: </p>
        <h3>{city}</h3>
        {/* <p>{state.city}</p> */}
        <p>Город компьютера: </p>
        {/* {state.randomConfirmCity ? <p>{state.randomConfirmCity.name}</p> : null} */}
      
    </div>
  );
}

export default App;
