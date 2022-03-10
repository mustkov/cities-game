import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRepository } from "./actions/takeCitiesDatas";

import "./assets/styles/style.scss";

import arrayDoneCities from "./functions/arrayDoneCities";
import checkStatusCity from "./functions/checkStatusCity";
import searchNextWord from "./functions/searchNextWord";
import takeLastLetter from "./functions/takeLastLetter";

import {
  setDoneCities,
  setLastLetter,
  setNewCity,
} from "./reducers/reposReducer";

import { useIsMount } from "./components/Hooks/useIsMount";

import Button from "./components/Button/Button";
import takeFirstLetter from "./functions/takeFirstLetter";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Score from "./components/Score/Score";

function App() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos);
  const doneCities = useSelector((state) => state.repos.doneCities);
  const startBaseCities = useSelector((state) => state.repos.startBaseCities);

  const isMount = useIsMount();

  const [city, setCity] = useState("");
  const [lastLet, setLastLet] = useState("");
  const [donesCities, setDonesCities] = useState([]);
  const [statusCity, setStatusCity] = useState();
  const [checkLetter, setCheckLetter] = useState("");
  const [promptCity, setPromptCity] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [alert, setAlert] = useState({ status: false, message: "" });
  const [score, setScore] = useState({ currentResult: 0, bestResult: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getRepository());
    setScore({ ...score, bestResult: loadLocaleStorage() });
  }, []);

  useEffect(() => {
    if (!isMount) {
      const a = () =>
        searchNextWord(startBaseCities, lastLet, donesCities).then((data) => {
          if (data === false) {
            a();
          } else {
            dispatch(setNewCity(data));
            setDonesCities([...donesCities, data]);
            takeLastLetter(data).then((data) => setCheckLetter(data));
          }
        });
      a();
    }
  }, [lastLet]);

  useEffect(() => {
    if (!isMount) {
      dispatch(setDoneCities(donesCities));
    }
  }, [donesCities]);

  useEffect(() => {
    if (score.currentResult > score.bestResult) {
      saveLocaleStorage(score.currentResult);
      setScore({ ...score, bestResult: score.currentResult });
    }
  }, [score.currentResult]);

  const inputChange = (e) => {
    setCurrentCity(e.target.value.replace(/\s+$/, ""));
  };

  const mainProcessing = () => {
    if (statusCity) {
      const firstLetter = takeFirstLetter(city);
      if (!(firstLetter === checkLetter)) {
        setAlert({
          status: true,
          message: "Не по правилам! Введен город не на последнюю букву!",
        });
        return null;
      }
    }
    checkStatusCity(repos.startBaseCities, city)
      .then(
        (data) => {
          setStatusCity(data);
        },
        (data) => {
          throw setAlert({ status: true, message: data });
        }
      )
      .then(() =>
        arrayDoneCities(doneCities, city)
          .then((data) => {
            setDonesCities([...donesCities, data]);
          })
          .catch(() => alert("Такой город уже был!"))
      )
      .then(() =>
        takeLastLetter(city).then((data) => {
          dispatch(setLastLetter(data));
          setLastLet(data);
        })
      );
    setScore({ ...score, currentResult: score.currentResult + 1 });
  };

  const saveLocaleStorage = (number) => {
    localStorage.setItem("score", number);
  };
  const loadLocaleStorage = () => {
    return localStorage.getItem("score");
  };

  const prompt = useCallback(() => {
    const a = () =>
      searchNextWord(startBaseCities, checkLetter, donesCities).then((data) => {
        if (data === false) {
          a();
        } else {
          setPromptCity(data);
        }
      });
    a();
  }, [startBaseCities, checkLetter, donesCities]);

  const disabled = useMemo(() => checkLetter === "", [checkLetter]);

  const modalOn = useCallback(() => {
    setSmShow(true);
  }, []);

  const modalOff = useCallback(() => {
    setSmShow(false);
  }, []);

  const modalOffAlert = useCallback(() => {
    setAlert(false);
  }, []);

  const setCurrentCity = (value) => {
    setCity(value);
  };

  return (
    <div className="App container">
      {alert.status && (
        <ModalWindow
          smShow={alert.status}
          modalOff={modalOffAlert}
          value={alert.message}
          title={"Предупреждение!"}
        />
      )}
      <Header />
      <form className="input-group mb-3 md" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          aria-describedby="button-addon2"
          onChange={(e) => inputChange(e)}
        />
        <Button
          onClick={mainProcessing}
          type={"submit"}
          className={"btn btn-outline-secondary"}
          id={"button-addon2"}
          title={"Отправить"}
        />
        <Button
          onClick={() => {
            prompt();
            modalOn();
          }}
          className={"btn btn-outline-secondary"}
          id={"button-addon3"}
          title={"Подсказка"}
          disabled={disabled}
        />
      </form>
      <ModalWindow
        smShow={smShow}
        modalOff={modalOff}
        value={promptCity}
        title={"Подсказка"}
      />
      <div className="main_info">
        <Main doneCities={doneCities} />
        <Score score={score.bestResult} />
      </div>
      
    </div>
  );
}

export default App;
