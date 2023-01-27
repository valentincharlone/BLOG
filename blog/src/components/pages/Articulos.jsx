import React from "react";
import { useState, useEffect } from "react";
import { PeticionAjax } from "../../helpers/PeticionAjax";
import { GlobalUrls } from "../../helpers/GlobalUrls";
import List from "./List";

const Aritculos = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    
    const datos = await PeticionAjax(GlobalUrls.url +"articles", "GET");

    if (datos.status === "success") {
      setArticles(datos.articles);
    }
    setLoading(false);
  };

  return (
    <>
      {
        loading ? "Loading..." : 
          articles.length >= 1 ? 
            <List articles={articles} setArticles={setArticles} />
          : 
            <h1>No hay articulos</h1>
      }
    </>
  )
}

export default Aritculos;
