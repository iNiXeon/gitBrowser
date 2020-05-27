import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { history } from '../redux'
// import { useState } from 'react-router-dom'

const MyInput = () => {
  const [username, setUsername] = useState('')

  const handleClick = () => {
    history.push(`/${username}`)
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-200 appearance-none leading-normal">
          <input
            id="input-field"
            // placeholder="Search"
            type="text"
            value={username}
            onChange={handleChange}
          />
          <button className="padding 5" onClick={handleClick} id="search-button" type="button">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

MyInput.propTypes = {}

export default MyInput
