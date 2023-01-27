import React from 'react'
import { Link } from 'react-router-dom'
import { GlobalUrls } from '../../helpers/GlobalUrls'
import { PeticionAjax } from '../../helpers/PeticionAjax'

const List = ({articles, setArticles}) => {

    const deleteArticle = async (id) => {
        // console.log(id)
        let datos = await PeticionAjax(GlobalUrls.url+'article/'+id, 'DELETE')
        
        if (datos.status === 'success'){
            let newArticles = articles.filter(newId => newId._id !== id)
            setArticles(newArticles)
        }
        else{
            setArticles(articles)
        }
    }
    return (
        articles.map((article) => (
            <article className="articulo-item" key={article._id}>
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
                <div className="datos">
                    <h3 className="title"><Link to={'/articulo/'+article._id}>{article.title}</Link></h3>
                    <p className="description">{article.content}</p>
                    <Link to={'/editArticle/'+article._id} className="edit">Editar</Link>
                    <button className="delete" onClick={() => deleteArticle(article._id) }>Borrar</button>
                </div>
            </article>
        ))
    )
}

export default List