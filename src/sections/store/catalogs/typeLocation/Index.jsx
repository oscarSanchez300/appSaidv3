import { Link } from 'react-router-dom';


import typeAdd from '../../../../img/tipoAdd.svg';
import lineaaImg from '../../../../img/almacen/Linea.png';
import baseImg from '../../../../img/almacen/base.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../auth/context';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';
import axios from 'axios';

export const Index = () => {

    const url = process.env.REACT_APP_API_URL;
    const { token, idUser } = useContext(AuthContext);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    const nameTypeLocation = document.getElementById('nameTypeLocation')
    const typeLocationActive = document.getElementById('typeLocationActive');

    const [valueInputNameTypeLocation, setValueInputNameTypeLocation] = useState('')
    const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [textModalInstructions, setTextModalInstructions] = useState('');

    const handleShowModalTypeLocation = () => {
        document.getElementById('typeLocationBtnModal').click();
    }
    const handleSetDisableNameTypeLocation = (e) => {
        setValueInputNameTypeLocation(e.target.value);
        setDisabledBtnAccept(false);
        return e;
    }
    const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
    const handleShowModalSuccess = () => setShowModalSuccess(true);

    const handleBtnAccept = () => {
        window.location.reload();
        return true;
    }

    const handleValidateTypeLocation = () => {
        if (valueInputNameTypeLocation.length === 0) {
            nameTypeLocation.classList.add('is-invalid');
        }

        if (valueInputNameTypeLocation.length > 0) {
            nameTypeLocation.classList.remove('is-invalid');
            handleStoreTypeLocation();
        }

        return true;
    }

    const handleStoreTypeLocation = () => {
        let active = 0;
        if (typeLocationActive.checked === true) {
            active = 1;
        }

        const f = new FormData();
        f.append('loctype_desc', nameTypeLocation.value);
        f.append('loctype_active', active);
        f.append('int_us_cod', idUser.idUser);
        for (let [name, value] of f) {
            console.log(`${name} : ${value}`);
        }

        axios.post(`${url}locationtypes`, f, config)
            .then(resp => {
                console.log(resp);

                const { loctype_desc } = resp.data.locationtype;
                setTextModalInstructions(`El tipo de ubicación ${loctype_desc} fue creado.`);
                document.getElementById('typeLocationBtnModal').click();
                handleShowModalSuccess();


            })
            .catch(error => {
                console.log(error.response);
            });

    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center animate__animated animate__fadeIn">
                    <h1 className="text-center mb-0 TitleIndex">Tipo de ubicacion</h1>
                    <p className='text-center'>Da click donde quieres acceder</p>
                    <div className='card mt-4 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalTypeLocation}>
                        <div className='card-body text-center'>
                            <img src={typeAdd} alt="Tipo de ubicacion" width='40%' />
                            <p className='mt-2 Chart-title m-0' style={{ fontSize: '14px' }}>Alta de tipo de ubicación</p>
                            <p className='text-center'>
                                <img src={lineaaImg} alt="Linea" />
                            </p>
                            <p className='text-center'>
                                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -17 }} width="140" height="8" />
                            </p>
                        </div>
                    </div>
                    <Link to="/store/catalogs" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                        <div className='card-body text-center'>
                            <img src={typeAdd} width='40%' alt='Tipo de ubicacion buscar' />
                            <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Baja, cambios y consulta de tipo de ubicación</p>
                            <p className='text-center'>
                                <img src={lineaaImg} alt="Linea" />
                            </p>
                            <p className='text-center'>
                                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -7 }} width="140" height="8" />
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <button type="button" id='typeLocationBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className='text-center Titulos'>Tipo de ubicación</h5>
                            <p className='subtitulos text-center'>Escribe y selecciona los detalles del tipo de ubicación</p>
                            <div className='row justify-content-center'>
                                <div className='col-md-8'>
                                    <div className="mb-3">
                                        <label htmlFor="nameTypeLocation" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                                        <div className='input-group'>
                                            <span className="ico-tipo"></span>
                                            <input type="text" maxLength='15' className="form-control" id="nameTypeLocation" value={valueInputNameTypeLocation} onChange={(event) => handleSetDisableNameTypeLocation(event)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <label htmlFor="typeLocationActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="typeLocationActive" defaultChecked disabled={disabledBtnAccept} />
                                        <label className="form-check-label" htmlFor="typeLocationActive">Activo</label>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12' style={{ marginTop: '10%', marginBottom: '20%' }}>
                                <div className='position-relative'>
                                    <div className='position-absolute top-0 start-0'>
                                        <button className='btn btn-regresar' data-bs-dismiss="modal">
                                            Cancelar
                                        </button>
                                    </div>
                                    <div className='position-absolute top-0 end-0'>
                                        <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateTypeLocation}>
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AlertTwoBtn
                typeAlert='success'
                showModal={showModalSuccess}
                handleCloseModal={handleCloseModalSuccess}
                handleShowModal={handleShowModalSuccess}
                TextModalBody='Operación exitosa'
                textModalInstructions={textModalInstructions}
                textBtnAccept='Aceptar'
                handleAccionBtnAccept={handleBtnAccept}
            />
        </>
    )
}
