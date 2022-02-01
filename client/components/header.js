import React, { useState } from 'react'

const Header = () => {
  const [toggled, toggle] = useState(false)

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-400">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <button
          type="button"
          id="toggle-button"
          className="font-semibold text-xl tracking-tight"
          onClick={() => toggle(!toggled)}
        >
          {!toggled ? "Показать меню" : "Cкрыть меню"}
        </button>
      </div>
      {toggled && (
        <div id="menu" className="block bg-red-400">
          <a href="https://google.com" className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-5 w-5" viewBox="0 0 7 7">
              <path d="M 0 2 L 8 1 L 8 2 L 0 3 L 0 2 M 0 4 L 8 3 L 8 4 L 0 5 L 0 4 M 0 6 L 8 5 L 8 6 L 0 7 L 0 6"/>
              <title>
                Menu
              </title>
            </svg>
          </a>
        </div>
      )}
    </nav>
  )
}

export default React.memo(Header)
