import { useState } from "react";

export const useForm = (objetoinicial = {} ) => {

    const[form, setForm] = useState(objetoinicial)

    const serializarForm = (form) => {
        const formData = new FormData(form)

        const newObj = {}

        for(let [name, value] of formData){
            newObj[name] = value
        }
        return newObj
    }

    const send = (e) => {
        e.preventDefault()

        // let curso = {
        //     title: e.target.title.value,
        //     anio: e.target.anio.value,
        //     description: e.target.description.value,
        //     auotr: e.target.autor.value,
        //     email: e.target.email.value,
        // }

        let curso = serializarForm(e.target)
        setForm(curso)
    }

    const change = ({target}) => {
        const {name, value} = target
        setForm({
            ...form,
            [name]: value
        })
    }

    return {
        form,
        send, 
        change
    }
}