import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { PeticionAjax } from '../../helpers/PeticionAjax'
import { useForm } from '../../hooks/UseForm'
import { GlobalUrls } from '../../helpers/GlobalUrls'

const Editar = () => {

  const {form, send, change} = useForm({})
  const [result, setResult] = useState('')
  const [article, setArticle] = useState({})
  const params = useParams()

  useEffect(() => {
    getArticle();
    
  }, [params]);

  const getArticle = async () => {
    
    const datos = await PeticionAjax(GlobalUrls.url +"article/"+params.id, "GET");

    if (datos.status === "success") {
      setArticle(datos.article)
      console.log(datos)
    }
    
  }

  const editArticles = async(e) => {
    e.preventDefault()
    //recoger datos del form
    let newArticle = form

    //save article in the backend
    const datos = await PeticionAjax(GlobalUrls.url + "editArticle/"+params.id, "PUT", newArticle)
    
    if(datos.status === 'success'){
      console.log(datos)
      
      const fileInput = document.getElementById('file')
      //subir img
      
      const formData = new FormData()
      formData.append('file', fileInput.files[0])
      
      const subido = await PeticionAjax(GlobalUrls.url+ "subir-img/" +article._id, "POST" , formData, true)
      console.log(subido)
      if(subido){
        setResult('guardado')
      }else{
        setResult('error')
      }
    }
    else {
      setResult('error')
    }
  }


  return (
    <div className='div-gral'>
      <h1>Editar articulo</h1>
      <h4>Formulario para editar</h4>
      {/* <pre>{JSON.stringify(form)}</pre> */}
      <strong>{result == 'guardado' ? 'Articulo guardado con exito' : ''}</strong>
      
      <strong>{result == 'error' ? 'Datos incorrectos' : ''}</strong>
      
      <form className='form' onSubmit={editArticles}>
        <div className='form-div'>
          <label htmlFor='title'>Title</label>
          <input type="text" name='title'  onChange={change} defaultValue={article.title}/>
        </div>

        <div className='form-div'>
          <label htmlFor='content'>Content</label>
          <textarea type="text" name='content' onChange={change} defaultValue={article.content}/>
        </div>

        <div className='form-div'>
          <label htmlFor='file'>Imagen</label>
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
          <input type="file" name='file' id='file' />
        </div>

        <input type="submit" value='Save' className='btn btn-success'/>
      </form>
    </div>
  )
}

export default Editar