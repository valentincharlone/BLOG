import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
          <li><NavLink to="/inicio">HOME</NavLink></li>
          <li><NavLink to="/articulos">ARTICLES</NavLink></li>
          <li><NavLink to="/crear">CREATE ARTICLES</NavLink></li>
      </ul>
  </nav>
  )
}

export default Nav