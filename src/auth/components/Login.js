import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

export const Login = () => {

    const { login, logout, user: userContext, logged } = useContext(AuthContext)

    const formsubmit = (e) => {
        e.preventDefault();

        const url = 'https://stg.saiv3api.imagendinamica.mx/api/';
        const nameID = document.getElementById('nameID');
        const passwordID = document.getElementById('passwordID');

        if (nameID.value.length === 0) {
            nameID.style.borderColor = 'red';
            return false;
        } else {
            nameID.style.borderColor = 'green';
        }

        if (passwordID.value.length === 0) {
            passwordID.style.borderColor = 'red';
            return false;
        } else {
            passwordID.style.borderColor = 'green';
        }


        console.log(nameID.value)
        console.log(passwordID.value)

        const f = new FormData();
        f.append('email', nameID.value);
        f.append('password', passwordID.value);



        axios.post(`${url}login`, f)
            .then(resp => {

                console.log(resp);
                const { success, user: userR, access_token } = resp.data;

                if (success) {

                    login( userR.firstname, access_token );

                    nameID.value = '';
                    passwordID.value = '';
                }
            })
            .catch(error => {
                console.log(error.response);
            });

    }

    const logoutOnClick = () => {
        logout();
    }

    return (
        <div>
            {
                logged ?
                    (
                        <div>
                            Bienvenido {userContext?.name}
                            <br />
                            <br />
                            <button onClick={logoutOnClick}>Salir</button>
                        </div>
                    )
                    :
                    (
                        <form onSubmit={formsubmit}>
                            <input type='email' name='email' id='nameID' placeholder='Usuario' />
                            <br />
                            <input type='password' name='password' id='passwordID' placeholder='Contraseña' />
                            <br />
                            <button>Entrar</button>
                        </form>
                    )
            }
        </div >
    )
}
