import { Link } from 'react-router-dom';
import typeAdd from '../../../../img/tipoAdd.svg';

import lineaaImg from '../../../../img/almacen/Linea.png';
import baseImg from '../../../../img/almacen/base.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../auth/context';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';
import { useFetch } from '../../../../hooks/useFetch';
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
  const nameCedis = document.getElementById('nameCedis');
  const cedisActive = document.getElementById('cedisActive');
  const selectCompanie = document.getElementById('selectCompanie');

  const stateCompanie = useFetch(`${url}companies`);
  const { loading: loadingCompanie, data: dataCompanie } = stateCompanie;
  console.log(!loadingCompanie && dataCompanie);

  useEffect(() => {
    dataCompanie &&
      dataCompanie.companies.map(companieItem => {
        const option = document.createElement('option');
        option.value = companieItem.company_id;
        option.innerHTML = companieItem.company_desc;
        selectCompanie.append(option);
        return selectCompanie;
      })
  }, [dataCompanie, selectCompanie])

  const [valueInputNameCedis, setValueInputNameCedis] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalCedis = () => {
    document.getElementById('cedisBtnModal').click();
  }
  const handleSetDisableNameCedis = (e) => {
    setValueInputNameCedis(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateCedis = () => {
    let validate = 0;
    if (valueInputNameCedis.length === 0) {
      validate++;
      nameCedis.classList.add('is-invalid');
    }

    if (valueInputNameCedis.length > 0) {
      nameCedis.classList.remove('is-invalid');
    }


    if (selectCompanie.value.length === 0) {
      validate++;
      selectCompanie.classList.add('is-invalid');
    }

    if (selectCompanie.value.length > 0) {
      selectCompanie.classList.remove('is-invalid');
    }


    if (validate === 0) {
      handleStoreCedis();
    }

    return true;
  }


  const handleStoreCedis = () => {
    let active = 0;
    if (cedisActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('dc_desc', nameCedis.value);
    f.append('dc_active', active);
    f.append('company_id', selectCompanie.value);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}dcs`, f, config)
      .then(resp => {
        console.log(resp);

        const { dc_desc } = resp.data.distributioncenter;
        setTextModalInstructions(`El destino ${dc_desc} fue creado.`);
        document.getElementById('cedisBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Destino</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div to="/store/products" className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalCedis}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0'>Alta de destino</p>
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
              <img src={typeAdd} width='40%' alt='Busqueda de destino' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Bajas, camios y consulta de destino</p>
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
      <button type="button" id='cedisBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Destino</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del destino</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameCedis" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameCedis" value={valueInputNameCedis} onChange={(event) => handleSetDisableNameCedis(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="cedisActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="cedisActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="cedisActive">Activo</label>
                  </div>
                </div>
                <div className='col-md-8 mt-2'>
                  <div className="mb-3">
                    <label htmlFor="selectCompanie" className="form-label" style={{ fontSize: '15px' }}>4. Compañia</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <select className="form-control" id="selectCompanie" disabled={disabledBtnAccept}>
                        <option value="">Selecciona la compañia</option>
                      </select>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateCedis}>
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
