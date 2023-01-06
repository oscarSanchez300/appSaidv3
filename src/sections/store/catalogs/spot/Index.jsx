import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';
import { AuthContext } from '../../../../auth/context';
import typeAdd from '../../../../img/tipoAdd.svg';

import lineaaImg from '../../../../img/almacen/Linea.png';
import baseImg from '../../../../img/almacen/base.png';
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
  const nameSpot = document.getElementById('nameSpot')
  const spotActive = document.getElementById('spotActive');

  const [valueInputNameSpot, setValueInputNameStatus] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalStatus = () => {
    document.getElementById('statusBtnModal').click();
  }
  const handleSetDisableNameStatus = (e) => {
    setValueInputNameStatus(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateSpot = () => {
    if (valueInputNameSpot.length === 0) {
      nameSpot.classList.add('is-invalid');
    }

    if (valueInputNameSpot.length > 0) {
      nameSpot.classList.remove('is-invalid');
      handleStoreStatus();
    }

    return true;
  }

  const handleStoreStatus = () => {
    let active = 0;
    if (spotActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('spot_desc', nameSpot.value);
    f.append('spot_active', active);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }


    axios.post(`${url}spots`, f, config)
      .then(resp => {
        console.log(resp);

        const { spot_desc } = resp.data.spot;
        setTextModalInstructions(`El tipo ${spot_desc} fue creado.`);
        document.getElementById('statusBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Lugar</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalStatus}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0'>Alta de lugar</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: 15 }} width="140" height="8" />
              </p>
            </div>
          </div>
          <Link to="/store/catalogs" className='card mt-2 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} width='40%' alt='Busqueda de lugar' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Bajas, camios y consulta de lugar</p>
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
      <button type="button" id='statusBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Lugar</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del lugar</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameSpot" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" maxLength='10' className="form-control" id="nameSpot" value={valueInputNameSpot} onChange={(event) => handleSetDisableNameStatus(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="spotActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="spotActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="spotActive">Activo</label>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateSpot}>
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
