import React, { useState } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import './css/Components.css'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const onInputChange = (e) => {
    setUser(e.target.value.trim(''))
  }

  const OnClickButton = async () => {
    dispatch(push(`/${user}`))
  }

  return (
    <div className="component">
      <input
        id="input-field"
        type="text"
        className="component-searchtool__input"
        onChange={onInputChange}
      />
      <button
        id="search-button"
        type="button"
        className="ml-1 bg-purple-800 hover:bg-purple-600 text-white rounded-r-lg"
        onClick={OnClickButton}
      >
        Search
      </button>
    </div>
  )
}

export default App
