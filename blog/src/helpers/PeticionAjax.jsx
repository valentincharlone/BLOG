
export const PeticionAjax =  async (url, metodo, data_save = '', archivos = false) => {
    
        let options = {
            method: 'GET'
        }

        if(metodo == 'GET' || metodo == 'DELETE'){
            options = {
                method: metodo,
            }
        }

        if(metodo == 'POST'  || metodo == "PUT"){

            if(archivos){
                options = {
                    method: metodo,
                    body : data_save
                }
            }else{

                options = {
                    method: metodo,
                    body : JSON.stringify(data_save),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }

        }
        const peticion = await fetch(url, options)
        const datos = await peticion.json()

        return (
            datos
        )
}
