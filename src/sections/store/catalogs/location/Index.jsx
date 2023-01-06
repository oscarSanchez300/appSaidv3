import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';
import { AuthContext } from '../../../../auth/context';
import { useFetch } from '../../../../hooks/useFetch';
import typeAdd from '../../../../img/tipoAdd.svg';

import lineaaImg from '../../../../img/almacen/Linea.png';
import baseImg from '../../../../img/almacen/base.png';

export const Index = () => {

  const url = process.env.REACT_APP_API_URL;
  const { token, idUser } = useContext(AuthContext);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };
  const nameLocation = document.getElementById('nameLocation')
  const locationActive = document.getElementById('locationActive');
  const selectCedis = document.getElementById('selectCedis');
  const selectCompanie = document.getElementById('selectCompanie');
  const selectAdress = document.getElementById('selectAdress');



  const stateCedis = useFetch(`${url}dcs`);
  const { loading: loadingCedis, data: dataDcs } = stateCedis;
  console.log(!loadingCedis && dataDcs);

  const stateCompanie = useFetch(`${url}companies`);
  const { loading: loadingCompanie, data: dataCompanie } = stateCompanie;
  console.log(!loadingCompanie && dataCompanie);

  const stateAdress = useFetch(`${url}addresses`);
  const { loading: loadingAdress, data: dataAdress } = stateAdress;
  console.log(!loadingAdress && dataAdress);

  useEffect(() => {
    dataDcs &&
      dataDcs.distributioncenters.map(dcsItem => {
        const option = document.createElement('option');
        option.value = dcsItem.dc_id;
        option.innerHTML = dcsItem.dc_desc;
        selectCedis.append(option);
        return selectCedis;
      })
  }, [dataDcs, selectCedis])

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

  useEffect(() => {
    dataAdress &&
      dataAdress.adresses.map(adressItem => {
        const option = document.createElement('option');
        option.value = adressItem.addr_id;
        const numInt = adressItem.addr_intnum || '';
        option.innerHTML = adressItem.addr_street + ' ' + adressItem.addr_extnum + ' ' + numInt;
        selectAdress.append(option);
        return selectAdress;
      })
  }, [dataAdress, selectAdress])

  const [valueInputNameLocation, setValueInputNameLocation] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalLocation = () => {
    document.getElementById('locationBtnModal').click();
  }
  const handleSetDisableNameLocation = (e) => {
    setValueInputNameLocation(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateAdress = () => {
    let validate = 0;
    if (valueInputNameLocation.length === 0) {
      validate++;
      nameLocation.classList.add('is-invalid');
    }

    if (valueInputNameLocation.length > 0) {
      nameLocation.classList.remove('is-invalid');
    }

    if (selectCedis.value.length === 0) {
      validate++;
      selectCedis.classList.add('is-invalid');
    }

    if (selectCedis.value.length > 0) {
      selectCedis.classList.remove('is-invalid');
    }

    if (selectCompanie.value.length === 0) {
      validate++;
      selectCompanie.classList.add('is-invalid');
    }

    if (selectCompanie.value.length > 0) {
      selectCompanie.classList.remove('is-invalid');
    }

    if (selectAdress.value.length === 0) {
      validate++;
      selectAdress.classList.add('is-invalid');
    }

    if (selectAdress.value.length > 0) {
      selectAdress.classList.remove('is-invalid');
    }

    if (validate === 0) {
      handleStoreAdress();
    }

    return true;
  }

  const handleStoreAdress = () => {
    let active = 0;
    if (locationActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('wh_desc', valueInputNameLocation);
    f.append('wh_active', active);
    f.append('dc_id', selectCedis.value);
    f.append('company_id', selectCompanie.value);
    f.append('addr_id', selectAdress.value);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}whs`, f, config)
      .then(resp => {
        console.log(resp);

        const { wh_desc } = resp.data.warehouse;
        setTextModalInstructions(`La ubicación ${wh_desc} fue creada.`);
        document.getElementById('locationBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Ubicación</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalLocation}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0'>Alta de Ubicación</p>
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
              <img src={typeAdd} width='40%' alt='Busqueda de ubicacion' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Bajas, camios y consulta de Ubicación</p>
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
      <button type="button" id='locationBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Ubicación</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del ubicación</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameLocation" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameLocation" value={valueInputNameLocation} onChange={(event) => handleSetDisableNameLocation(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="locationActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="locationActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="locationActive">Activo</label>
                  </div>
                </div>
                <div className='col-md-8 mt-2'>
                  <div className="mb-3">
                    <label htmlFor="selectCedis" className="form-label" style={{ fontSize: '15px' }}>3. Destino</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <select className="form-control" id="selectCedis" disabled={disabledBtnAccept}>
                        <option value="">Selecciona el destino</option>
                      </select>
                    </div>
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
                <div className='col-md-8 mt-2'>
                  <div className="mb-3">
                    <label htmlFor="selectAdress" className="form-label" style={{ fontSize: '15px' }}>5. Dirección</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <select className="form-control" id="selectAdress" disabled={disabledBtnAccept}>
                        <option value="">Selecciona la dirección</option>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateAdress}>
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
