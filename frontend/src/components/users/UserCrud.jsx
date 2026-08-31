import Main from '../templates/Main'
import axios from 'axios'
import React, { useState, useEffect} from 'react'

const headerProps = {
    icon: 'users',
    title: 'usuarios',
    subtitle: 'Cadastro de Usuarios: incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'

const initialState = {
    user: {name: '', email: ''}
} 

export default function UserCrud() {
    const [user, setUser] =useState(initialState)
    const [list, setList] =useState([])

    const clear = () => {
        setUser(initialState)
    }

    const getUpdatedList = (newUser, add = true) => {
        const filteredList = list.filter(u => u.id !== newUser.id)

        if(add) filteredList.unshift(newUser)
            return filteredList
    }

    const save = () => {
        const currentUser = user

        const method = currentUser.id ? 'put' : 'post'
        const url = currentUser.id ? `${baseUrl}/${currentUser.id}` : baseUrl

        axios[method](url, currentUser) 
            .then(resp => {
                const updatedList = getUpdatedList(resp.data)
                setList(updatedList)
                clear()
            })
    }


    const updatedFild = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    return (
        <Main {...headerProps}>
            Cadastro de Usuário
        </Main>
    )
}