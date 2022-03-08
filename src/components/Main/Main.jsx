import React from "react";
import Search from "../Search/Search"

export default function Main({picture, doneCities}) {
  const currentCity = doneCities[doneCities.length - 1]
  return (
    <div className="main" >
      {currentCity ? <span className="main_city">{currentCity}</span> :  <span className="main_city">Загадайте город</span>}
      
      {currentCity &&
      <Search city={currentCity} className="main_search"/>
      }
    </div>
  );
}
