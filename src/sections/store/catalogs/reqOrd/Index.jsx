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
    const nameReqOrd = document.getElementById('nameReqOrd')
    const reqOrdActive = document.getElementById('reqOrdActive');
    const detailReqOrd = document.getElementById('detailReqOrd');


    const [valueInputNameReqOrd, setValueInputNameReqOrd] = useState('')
    const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [textModalInstructions, setTextModalInstructions] = useState('');

    const handleShowModalReqOrd = () => {
        document.getElementById('reqOrdBtnModal').click();
    }
    const handleSetDisableNameReqOrd = (e) => {
        setValueInputNameReqOrd(e.target.value);
        setDisabledBtnAccept(false);
        return e;
    }
    const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
    const handleShowModalSuccess = () => setShowModalSuccess(true);

    const handleBtnAccept = () => {
        window.location.reload();
        return true;
    }

    const handleValidateReqOrd = () => {
        let validate = 0;

        if (valueInputNameReqOrd.length === 0) {
            validate++
            nameReqOrd.classList.add('is-invalid');
        }

        if (valueInputNameReqOrd.length > 0) {
            nameReqOrd.classList.remove('is-invalid');
        }

        if (detailReqOrd.value.length === 0) {
            validate++
            detailReqOrd.classList.add('is-invalid');
        }

        if (detailReqOrd.value.length > 0) {
            detailReqOrd.classList.remove('is-invalid');
        }

        if (validate === 0) {
            handleStoreReqOrd();
        }

        return true;
    }

    const handleStoreReqOrd = () => {
        let active = 0;
        if (reqOrdActive.checked === true) {
            active = 1;
        }

        const f = new FormData();
        f.append('so_req_desc', nameReqOrd.value);
        f.append('so_req_active', active);
        f.append('so_req_detail', detailReqOrd.value);
        f.append('int_us_cod', idUser.idUser);
        for (let [name, value] of f) {
            console.log(`${name} : ${value}`);
        }

        axios.post(`${url}sorequirements`, f, config)
            .then(resp => {
                console.log(resp);

                const { so_req_desc } = resp.data.sorequirement;
                setTextModalInstructions(`${so_req_desc} fue creado.`);
                document.getElementById('reqOrdBtnModal').click();
                handleShowModalSuccess();

            })
            .catch(error => {
                console.warn(error.response);
            });
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center animate__animated animate__fadeIn">
                    <h1 className="text-center mb-0 TitleIndex">Requerimiento Orden de Servicio</h1>
                    <p className='text-center'>Da click donde quieres acceder</p>
                    <div className='card mt-4 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalReqOrd}>
                        <div className='card-body text-center'>
                            <img src={typeAdd} alt="Productos" width='40%' />
                            <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Alta requerimiento orden de servicio</p>
                            <p className='text-center'>
                                <img src={lineaaImg} alt="Linea" />
                            </p>
                            <p className='text-center'>
                                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -7 }} width="140" height="8" />
                            </p>
                        </div>
                    </div>
                    <Link to="/store/catalogs" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                        <div className='card-body text-center'>
                            <img src={typeAdd} width='40%' alt='Tipo crear' />
                            <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Baja, cambios y consulta requerimiento orden de servicio</p>
                            <p className='text-center'>
                                <img src={lineaaImg} alt="Linea" />
                            </p>
                            <p className='text-center'>
                                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -37 }} width="140" height="8" />
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <button type="button" id='reqOrdBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className='text-center Titulos'>Requerimiento de orden de servicio</h5>
                            <p className='subtitulos text-center'>Escribe y selecciona los detalles</p>
                            <div className='row justify-content-center'>
                                <div className='col-md-8'>
                                    <div className="mb-3">
                                        <label htmlFor="nameReqOrd" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                                        <div className='input-group'>
                                            <span className="ico-tipo"></span>
                                            <input type="text" maxLength='15' className="form-control" id="nameReqOrd" value={valueInputNameReqOrd} onChange={(event) => handleSetDisableNameReqOrd(event)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <label htmlFor="reqOrdActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="reqOrdActive" defaultChecked disabled={disabledBtnAccept} />
                                        <label className="form-check-label" htmlFor="reqOrdActive">Activo</label>
                                    </div>
                                </div>
                                <div className='col-md-8 mt-4'>
                                    <div className="mb-3">
                                        <label htmlFor="detailReqOrd" className="form-label" style={{ fontSize: '15px' }}>3. Detalle</label>
                                        <div className='input-group'>
                                            <span className="ico-tipo"></span>
                                            <input type="text" maxLength='30' className="form-control" id="detailReqOrd" disabled={disabledBtnAccept} />
                                        </div>
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
                                        <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateReqOrd}>
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
