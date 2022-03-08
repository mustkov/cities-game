import React from 'react'

export default function Score({score}) {
  return (
    <div className='score'>
        <p>Ваш лучший результат: <span>{score}</span></p>
    </div>
  )
}
