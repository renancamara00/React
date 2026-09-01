import Main from '../templates/Main'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const headerProps = {
    icon: 'users',
    title: 'usuarios',
    subtitle: 'Cadastro de Usuarios: incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'

const initialState = { name: '', email: '' }


export default function UserCrud() {
    const [user, setUser] = useState({ ...initialState })
    const [list, setList] = useState([])

    useEffect(() => {
        axios(baseUrl).then(resp => {
            setList(resp.data)
        })
    }, [])

    const clear = () => {
        setUser(initialState)
    }

    const getUpdatedList = (newUser, add = true) => {
        const filteredList = list.filter(u => u.id !== newUser.id)

        if (add) filteredList.unshift(newUser)
        return filteredList
    }

    const save = () => {

        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const updatedList = getUpdatedList(resp.data)
                setList(updatedList)
                clear()
            })
    }


    const updatedField = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const renderForm = () => {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={updatedField}
                                placeholder="Digite o nome..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={updatedField}
                                placeholder="Digite o email..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={save}
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={clear}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const load = (user) => {
        setUser(user)

    }

    const remove = (user) => {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const updatedList = getUpdatedList(user, false)
            setList(updatedList)
        })
    }

    const renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
        return list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ms-2" onClick={() => remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main>
    )
}