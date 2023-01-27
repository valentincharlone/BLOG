import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import Aritculos from '../components/pages/Articulos'
import Inicio from '../components/pages/Inicio'
import Crear from '../components/pages/Crear'
import Busqueda from '../components/pages/Busqueda'
import Error from '../components/pages/Error'
import Editar from '../components/pages/Editar'

import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import Articulo from '../components/pages/Articulo'

const Rutas = () => {
  return (
    <BrowserRouter>
    
        <Header />

        <Nav />

        <section id='content' className='content'>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/inicio' element = {<Inicio />} />
                <Route path='/articulos' element= {<Aritculos />} />
                <Route path='/crear' element={<Crear />} />
                <Route path='/buscar/:busqueda' element={<Busqueda />} />
                <Route path='/articulo/:id' element={<Articulo />} />
                <Route path='/editArticle/:id' element={<Editar />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </section>

        <Sidebar />

        <Footer />
    </BrowserRouter>
  )
}

export default Rutas