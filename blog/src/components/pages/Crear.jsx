import React from 'react'
import { useState } from 'react'
import { PeticionAjax } from '../../helpers/PeticionAjax'
import { useForm } from '../../hooks/UseForm'
import { GlobalUrls } from '../../helpers/GlobalUrls'

const Crear = () => {

  const {form, send, change} = useForm({})
  const [result, setResult] = useState('')

  const saveArticles = async(e) => {
    e.preventDefault()
    //recoger datos del form
    let newArticle = form

    //save article in the backend
    const datos = await PeticionAjax(GlobalUrls.url+'crear', 'POST', newArticle)
    
    if(datos){
      console.log(datos)
      
      const fileInput = document.getElementById('file')
      //subir img
      
      const formData = new FormData()
      formData.append('file', fileInput.files[0])
      
      const subido = await PeticionAjax(GlobalUrls.url+'subir-img/'+datos.article._id, 'POST', formData, true)
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
      <h1>CREATE ARTICLE</h1>
      {/* <pre>{JSON.stringify(form)}</pre> */}
      <strong>{result == 'guardado' ? 'Articulo guardado con exito' : ''}</strong>
      
      <strong>{result == 'error' ? 'Datos incorrectos' : ''}</strong>
      
      <form className='form' onSubmit={saveArticles}>
        <div className='form-div'>
          <label htmlFor='title'>TITLE</label>
          <input type="text" name='title'  onChange={change}/>
        </div>

        <div className='form-div'>
          <label htmlFor='content'>CONTENT</label>
          <textarea type="text" name='content' onChange={change}/>
        </div>

        <div className='form-div'>
          <label htmlFor='file'>IMAGE</label>
          <input type="file" name='file' id='file' />
        </div>

        <input type="submit" value='Save' className='btn btn-success'/>
      </form>
    </div>
  )
}

export default Crear