import React from 'react'
import { Link } from 'react-router-dom'

const Inicio = () => {
  return (
    <div className='home'>
        <h1>WELCOME TO BLOG WITH REACT</h1>
        <p>Blog developed with the MERN stack </p>
        <h5>(Mongo, Express, React y Node)</h5>
        <Link to='/articulos' className='button'>See articles</Link>
    </div>
  )
}

export default Inicio