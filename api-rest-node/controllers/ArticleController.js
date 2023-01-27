const { error } = require("console");
const fs = require("fs");
const path = require('path')
const { validateArticle } = require("../helpers/Validate");
const Article = require("../models/ArticleModel");

// const prueba = (req, res) => {
//   return res.status(200).json({
//     mensaje: "soy un mensaj de preuba",
//   });
// };

const crear = (req, res) => {
  //recoger params por post a guardar
  let parametros = req.body;

  //validar datos

  try {
    validateArticle(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //crear objeto a guardar
  const article = new Article(parametros);

  //asignar valores a objeto basado en el modelo( manual o automatico)

  //guardar en base de dato
  article.save((error, articleSave) => {
    if (error || !articleSave) {
      return res.status(400).json({
        status: "error",
        mensaje: "Nose ha guardado article",
      });
    }
    //devolver resultas

    return res.status(200).json({
      status: "success",
      article: articleSave,
      mensaje: "Aricle guardado",
    });
  });
};

const getArticles = (req, res) => {
  let query = Article.find({});
  
  // query.limit(3);

  query.sort({ date: -1 }).exec((error, articles) => {
    if (error || !articles) {
      return res.status(404).json({
        status: "error",
        mensaje: "no se han encotnrado articles",
      });
    }
    return res.status(200).send({
      status: "success",
      count: articles.length,
      articles,
    });
  });
};

const oneArticle = (req, res) => {
  //recoger id por la ulr
  let id = req.params.id;

  //buscar articulo
  Article.findById(id, (error, article) => {
    //si no existe devovler error
    if (error || !article) {
      return res.status(404).json({
        status: "error",
        mensaje: "no se han encotnrado articles",
      });
    }
    //return result
    return res.status(200).json({
      status: "success",
      article,
    });
  });
};

const deleteArticle = (req, res) => {
  let articleId = req.params.id;

  Article.findOneAndDelete({ _id: articleId }, (error, articleDeleted) => {
    if (error || !articleDeleted) {
      return res.status(400).json({
        status: "error",
        mensaje: "error al borrar articul0o",
      });
    }

    return res.status(200).json({
      status: "success",
      article: articleDeleted,
      mensaje: "Metodo de borarr",
    });
  });
};

const updateArticle = (req, res) => {
  //recoger id
  let articleId = req.params.id;

  //recoger dATOS DEL body
  let parametros = req.body;

  //validar datos
  try {
    validateArticle(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //buscar y actualizar articulo
  Article.findOneAndUpdate(
    { _id: articleId },
    parametros,
    {new: true},
    (error, articleUpdate) => {
      if (error || !articleUpdate) {
        return res.status(500).json({
          status: "error",
          mensaje: "error al actualizar articulo",
        });
      }

      return res.status(200).json({
        status: "success",
        article: articleUpdate,
      });
    }
  );
};

const subir = (req, res) => {
  //configurar multer

  //recoger el ficherp de imag subido
  if(!req.file && !req.files){
    return res.status(400).json({
      status: "error",
      mensaje: "peticion invalida",
    })
  }
  //name of image
  let nameArchive = req.file.originalname;

  // extension of archive
  let archive_split = nameArchive.split("\.");
  let extension = archive_split[1];

  // comprube extension correct

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    //borrar archivos y dar respuestas
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "archivo invalido",
      })
    })

  }
  else {

    //recoger id
    let articleId = req.params.id;

    //buscar y actualizar articulo
    Article.findOneAndUpdate(
      { _id: articleId},
      {image: req.file.filename},
      {new: true},
      (error, articleUpdate) => {
        if (error || !articleUpdate) {
          return res.status(500).json({
            status: "error",
            mensaje: "error al actualizar articul0o",
          })
        }
        return res.status(200).json({
          status: "success",
          article: articleUpdate,
          fichero: req.file
        })
    })
  }
}

const image = (req, res) => {
    let fichero = req.params.fichero
    let ruta_fisica = './img/articles/'+fichero

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe) {
            return res.sendFile(path.resolve(ruta_fisica))
        }
        else {
            return res.status(404).json({
                status: "error",
                mensaje: "Imagen no existe",
                existe,
                fichero,
                ruta_fisica
            });
        }
    })
}

const buscador = (req, res) => {
  //sacar string de busqueda
  let busqueda = req.params.busqueda

  //find OR 
  Article.find({ '$or': [
    { 'title': { '$regex': busqueda, '$options': 'i'}},
    { 'content': { '$regex': busqueda, '$options': 'i'}},

  ]})
  .sort({date: -1})
  .exec((error, articulosEncontrados) => {

    if(error || !articulosEncontrados || articulosEncontrados.length <= 0){
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado articulos"
      })
    }

    return res.status(200).json({
      status: "success",
      articles: articulosEncontrados
    })
  })

  //orden

  //ejecutar consulta

  //devolver resulta
}

module.exports = {
  // prueba,
  crear,
  getArticles,
  oneArticle,
  deleteArticle,
  updateArticle,
  subir,
  image,
  buscador
}
