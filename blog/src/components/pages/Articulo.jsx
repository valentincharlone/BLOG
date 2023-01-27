import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PeticionAjax } from '../../helpers/PeticionAjax';
import { GlobalUrls } from '../../helpers/GlobalUrls';

const Articulo = () => {
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams()
  
    useEffect(() => {
      getArticle();
    }, []);
  
    const getArticle = async () => {
      
      const datos = await PeticionAjax(GlobalUrls.url +"article/"+params.id, "GET");
  
      if (datos.status === "success") {
        setArticle(datos.article);
      }
      setLoading(false);
      console.log(article)
    };
  
    return (
      <div className='home'>

          {
            loading ? "Loading..." :  
              
              <>
                <div className="mascara">
                    {   
                        article.image != "default.png" && 
                        <img src={GlobalUrls.url+'image/' + article.image}/>
                    }

                    {
                        article.image == "default.png" && 
                        <img src="https://sigdeletras.com/images/blog/202004_react_leaflet/react.png"/> 
                    }
                    
                </div>
                <h1>{article.title}</h1>
                <span>{article.date}</span>
                <p>{article.content}</p>
              </> 
  
          }
      </div>
      
    )
  }

export default Articulo