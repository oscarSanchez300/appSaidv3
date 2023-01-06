import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'animate.css';
import '../../styles/tabla.css';
import logoImagen from '../../img/logoESTE.png';

export const Login = () => {

    const { login, logged } = useContext(AuthContext)

    const navigate = useNavigate();

    const formsubmit = (e) => {
        e.preventDefault();

        document.getElementById('errorLogin').style.display = 'none';

        const url = process.env.REACT_APP_API_URL;
        const nameID = document.getElementById('nameID');
        const passwordID = document.getElementById('passwordID');

        if (nameID.value.length === 0) {
            nameID.classList.add('is-invalid');
            return false;
        } else {
            nameID.classList.remove('is-invalid');
        }

        if (passwordID.value.length === 0) {
            passwordID.classList.add('is-invalid');
            return false;
        } else {
            passwordID.classList.remove('is-invalid');
        }

        if (passwordID.value.length < 6) {
            passwordID.classList.add('is-invalid');
            document.getElementById('errorPassword').classList.add('animate__animated', 'animate__bounceIn');
            document.getElementById('errorPassword').style.display = 'block';
            return false;
        } else {
            passwordID.classList.remove('is-invalid');
            document.getElementById('errorPassword').style.display = 'none';
        }


        const f = new FormData();
        f.append('email', nameID.value);
        f.append('password', passwordID.value);



        axios.post(`${url}login`, f)
            .then(resp => {

                console.log(resp);
                const { success, user: userR, access_token } = resp.data;

                if (success) {

                    const nameUser = userR.firstname;
                    const idUser = userR.user_id;


                    login(nameUser, idUser, access_token);

                    nameID.value = '';
                    passwordID.value = '';

                    navigate('/', {
                        replace: true
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.data.message === 'La contraseña no coincide') {
                    document.getElementById('errorLogin').classList.add('animate__animated', 'animate__bounceIn');
                    document.getElementById('errorLogin').style.display = 'block';
                }
            });

    }

    const viewPasswordFunction = () => {
        const checkbox = document.getElementById('viewPassword');
        const passwordID = document.getElementById('passwordID');
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                // console.log("Checkbox is checked..");
                passwordID.type = "text";
            } else {
                // console.log("Checkbox is not checked..");
                passwordID.type = "password";
            }
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
                                <div className='col-md-5' style={{ marginTop: '10%' }}>
                                    <img src={logoImagen} alt="Logo" className='img-fluid animate__animated animate__bounce' style={{ width: '75%', display: 'block', margin: 'auto' }} />
                                    <h1 className='text-center mt-4'><b>!Bienvenido!</b></h1>
                                </div>
                                <div className='col-md-7 bg-azul' style={{ height: '100vh' }}>
                                    <h1 className='text-center text-white' style={{ marginTop: '12%', fontSize: '50px' }}>Iniciar Sesión</h1>
                                    <p className='text-center text-white mt-0 p-o m-o' style={{ fontSize: '20px' }}>Ingresa tu correo y contraseña</p>
                                    <form onSubmit={formsubmit}>

                                        <div className='row justify-content-center'>
                                            <div className='col-md-8'>

                                                <div className="mb-3">
                                                    <label htmlFor='nameID' className='form-label text-white' style={{ fontSize: '18px' }}>Correo</label>
                                                    <div className='input-group'>
                                                        <span className="ico-correo"></span>
                                                        <input type='email' name='email' id='nameID' className='form-control' placeholder='Ingresa tu correo' />
                                                    </div>
                                                    <div className="col-md-12 text-center" id="errorLogin" style={{ display: 'none' }}>
                                                        <small className="text-danger"><b>Correo o contraseña incorrectos, verifica los datos y vuelva a intentarlo</b></small>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor='passwordID' className='form-label text-white' style={{ fontSize: '18px' }}>Contraseña</label>
                                                    <div className='input-group'>
                                                        <span className="ico-password"></span>
                                                        <input type='password' name='password' id='passwordID' className='form-control' placeholder='Ingresa tu contraseña' />
                                                    </div>
                                                    <div className="col-md-12 text-center" id="errorPassword" style={{ display: 'none' }}>
                                                        <small className="text-danger"><b>La contraseña debe contener al menos 6 caracteres.</b></small>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-center">
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-check">
                                                            <input onClick={viewPasswordFunction} className="form-check-input" type="checkbox" value="" id="viewPassword" />
                                                            <label className="form-check-label fw-light fs-6 text-white" htmlFor="viewPassword">
                                                                Mostrar contraseña
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <p className="text-white">¿Olvidaste tu contraseña?</p>
                                                    </div>
                                                </div>

                                                <div className='text-center'>
                                                    <button className='btn btn-outline-light btn-md rounded-pill btn-login mb-4' style={{ marginTop: '8%' }}>Ingresar</button>
                                                </div>
                                            </div>
                                        </div>

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
