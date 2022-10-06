import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


import '../../styles/tabla.css';

export const Login = () => {

    const { login, logged } = useContext(AuthContext)

    const navigate = useNavigate();

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


        // console.log(nameID.value)
        // console.log(passwordID.value)

        const f = new FormData();
        f.append('email', nameID.value);
        f.append('password', passwordID.value);



        axios.post(`${url}login`, f)
            .then(resp => {

                console.log(resp);
                const { success, user: userR, access_token } = resp.data;

                if (success) {

                    login(userR.firstname, access_token);

                    nameID.value = '';
                    passwordID.value = '';

                    navigate('/', {
                        replace: true
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
            });

    }

    return (
        <>
            {
                (logged === false)
                    ?
                    (
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <p className='text-center'>Imagen Dinamicaaaaaaaaaa!</p>
                                </div>
                                <div className='col-md-7 bg-azul' style={{height: '100vh'}}>
                                    <form onSubmit={formsubmit}>
                                        <br />
                                        <input type='email' name='email' id='nameID' className='form-control' placeholder='Usuario' />
                                        <input type='password' name='password' id='passwordID' className='form-control mt-4' placeholder='Contraseña' />
                                        <button className='btn btn-outline-light btn-md rounded-pill btn-login mt-4 mb-4'>Ingresarrrrrr</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <Navigate to="/home" />
            }
        </>

    )
}
