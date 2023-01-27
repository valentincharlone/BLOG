import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalUrls } from "../../helpers/GlobalUrls";

const Sidebar = () => {

  const [buscar, setBuscar] = useState('')
  const navegate = useNavigate()

  const buscarArticles = (e) => {
    e.preventDefault()
    let mi_busqueda = e.target.search_field.value
    console.log(mi_busqueda)
    navegate('buscar/'+mi_busqueda, {replace: true})
  }

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={buscarArticles}>
          <input type="text" name="search_field"/>
          <input type="submit" id="search" value='Buscar' />
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Añadir pelicula</h3>
        <form>
          <input type="text" id="title" placeholder="Titulo" />
          <textarea id="description" placeholder="Descripción"></textarea>
          <input type="submit" id="save" value="Guardar" />
        </form>
      </div> */}
    </aside>
  )
}

export default Sidebar;
