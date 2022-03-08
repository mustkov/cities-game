import React from 'react'
import Search from '../Search/Search'

export default function UsedCities({doneCities}) {
  return (
    <div className="usedCities">
      {doneCities.map((a, index) => (
            <div key={`${a}_${index}`} className="usedCity">
              <div className="usedCities_name">{a}</div>
              <Search city={a} className={"usedCities_links"} />
            </div>
        ))}
      </div>
  )
}
