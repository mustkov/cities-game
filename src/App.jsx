import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRepository } from "./actions/takeCitiesDatas";
import "./App.scss";
import arrayDoneCities from "./functions/arrayDoneCities";
import checkStatusCity from "./functions/checkStatusCity";
import searchNextWord from "./functions/searchNextWord";
import takeLastLetter from "./functions/takeLastLetter";
import { setDoneCities, setLastLetter, setNewCity } from "./reducers/reposReducer";
import {useIsMount} from "./components/Hooks/useIsMount"


function App() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos);
  const doneCities = useSelector((state) => state.repos.doneCities);
  const newCity = useSelector((state) => state.repos.newCity);

  const isMount = useIsMount();


  const [city, setCity] = useState("Москва");
  const [lastLet, setLastLet] = useState("");
  const [rCity, setRCity] = useState("");
  const [donesCities, setDonesCities] = useState([])
  const [statusCity, setStatusCity] = useState(false)
  const [checkLetter, setCheckLetter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  useEffect(() => {
    dispatch(getRepository());
  }, []);



  useEffect(() => {
    if(!isMount) {
    searchNextWord(repos.startBaseCities, lastLet).then((data) => {
      dispatch(setNewCity(data));
      setDonesCities([...donesCities, data]);
      takeLastLetter(data).then((data) => setCheckLetter(data))
    })
  }
  }, [lastLet]);

  useEffect(() => {
    if(!isMount) {
    dispatch(setDoneCities(donesCities))   
  }
  }, [donesCities]);


  useEffect(() => { 
    console.log(checkLetter);
  
  }, [checkLetter]);

  const inputChange = (e) => {
    setCurrentCity(e.target.value);
  };

 

  const buttonClick = () => {
    console.log('repos', repos)
    checkStatusCity(repos.startBaseCities, city).then((data) => setStatusCity(data), () => {console.log('хуево')})
    arrayDoneCities(doneCities, city).then((data) => setDonesCities([...donesCities, data]))
    takeLastLetter(city).then((data) => {dispatch(setLastLetter(data)); setLastLet(data)}) 

    // .then(() => arrayDoneCities(doneCities, city).then((data) => setDonesCities([...donesCities, data]))) 
    // .then(() => takeLastLetter(city).then((data) => {dispatch(setLastLetter(data)); setLastLet(data)})) 
  };






  const randomCity = (arrayNextsWords) => {
    const randomCity = Math.floor(Math.random() * arrayNextsWords.length);
    return randomCity;
  };

  const setCurrentCity = (value) => {
    setCity(value);
  };

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
          // defaultValue={'Москва'}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
          onClick={buttonClick}
        >
          Button
        </button>
        <button
          className="btn btn-outline-secondary"
          id="button-addon3"
          onClick={() => console.log('dsdsd')}
        >
          Подсказка
        </button>
      </form>
      <p>Введённый Вами город: </p>
      <h3>{city}</h3>
      {/* <p>{state.city}</p> */}
      <p>Город компьютера: </p>
      {/* <h3>{rCity}</h3> */}
      <h3>{lastLet}</h3>
      <h3>{newCity}</h3>
      
      {doneCities && doneCities.map((a, index) => (
        <div key={index}>{a}</div>
        )
      )}
      
      {/* {state.randomConfirmCity ? <p>{state.randomConfirmCity.name}</p> : null} */}
    </div>
  );
}

export default App;
