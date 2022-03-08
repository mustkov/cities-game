import React from 'react'

export default function Search({city, className}) {
    const searching = () => {
     window.open(`http://google.com/search?q=+${city}`);
    }
    return (
        <a
        className={className}
        onClick={searching}
      >
        Почитать о городе...
      </a>
    )
} 