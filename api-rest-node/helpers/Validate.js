const validator = require('validator')

const validateArticle = (parametros) => {
    
    let validator_title = !validator.isEmpty(parametros.title) &&
                            validator.isLength(parametros.title, {min: 5, max:undefined})
    let validator_contetn = !validator.isEmpty(parametros.content)

    if (!validator_title || !validator_contetn) {
        throw new Error('Nose ha validado la info')
    }
   
}

module.exports = {
    validateArticle
}