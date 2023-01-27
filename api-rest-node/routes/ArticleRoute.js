const express = require('express')
const multer = require('multer')
const ArticleController = require('../controllers/ArticleController')

const router = express.Router()

const storageImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img/articles/')
    },

    filename: function(req, file, cb) {
        cb(null, 'article ' + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: storageImg})

//rutas prueba

// router.get('/ruta-prueba', ArticleController.prueba)

//ruta util
router.post('/crear', ArticleController.crear)
router.get('/articles/', ArticleController.getArticles)
router.get('/article/:id', ArticleController.oneArticle)
router.delete('/article/:id', ArticleController.deleteArticle)
router.put('/editArticle/:id', ArticleController.updateArticle)
router.post('/subir-img/:id', subidas.single('file'), ArticleController.subir)
router.get('/image/:fichero', ArticleController.image)
router.get('/buscar/:busqueda', ArticleController.buscador)



module.exports = router
