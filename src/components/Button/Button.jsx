import React from 'react'

export default function Button(props) {
    return (
        <button
        {...props}
      >
        {props.title}
      </button>
    )
} 