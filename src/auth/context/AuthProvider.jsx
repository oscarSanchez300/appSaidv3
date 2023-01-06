import React from 'react'
import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import { types } from '../types/types'

const initialState = {
    logged: false
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const idUser = JSON.parse(localStorage.getItem('id_User'));
    const token = localStorage.getItem('token_real');


    return {
        logged: !!user,
        user: user,
        idUser: idUser,
        token: token,
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);

    const login = (name = '', idUser = '', token = '') => {

        const user = { name };
        const id_User = { idUser };

        const action = { type: types.login, payload: user, idUser: id_User, token: token }

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('id_User', JSON.stringify(id_User))
        localStorage.setItem('token_real', token)


        dispatch(action)
    }

    const logout = () => {
        localStorage.removeItem('token_real');
        localStorage.removeItem('user');
        localStorage.removeItem('id_User');
        const action = { type: types.logout };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
