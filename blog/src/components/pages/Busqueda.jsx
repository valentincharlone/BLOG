import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { GlobalUrls } from "../../helpers/GlobalUrls";
import List from "./List";

const Busqueda = () => {
 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams()

  useEffect(() => {
    
    getArticles();
  }, []);
  
  

  const getArticles = async () => {
    
    const datos = await PeticionAjax(GlobalUrls.url + "buscar/"+ params.busqueda, "GET")
    if (datos.status === "success" ) {
      setArticles(datos.articles);
    }
    setLoading(false);
    
  }
  return (
    <>
      {loading ? "Loading..." :
          articles.length >= 1 ? 
            <List articles={articles} setArticles={setArticles} />
            : 
            <h1>No hay articulos</h1>
      }
    </>
  )
}

export default Busqueda;