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

  const { token, idUser } = useContext(AuthContext);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };
  const nameSubtype = document.getElementById('nameSubtype');
  const selectTypes = document.getElementById('selectTypes');
  const typeActive = document.getElementById('typeActive');
  const url = process.env.REACT_APP_API_URL;
  const [valueInputNameSubtype, setValueInputNameSubtype] = useState('');
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');


  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);
  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }


  const stateTypes = useFetch(`${url}invtypes`)
  const { loading: loadingType, data: dataType } = stateTypes
  console.log(!loadingType && dataType)

  useEffect(() => {
    dataType &&
      dataType.invtypes.map(type => {
        const option = document.createElement('option')
        option.value = type.invt_id
        option.innerHTML = type.invt_desc
        selectTypes.append(option)
        return selectTypes;
      })
  }, [dataType, selectTypes])


  const handleShowModalSubtype = () => {
    document.getElementById('subtypeModalBtn').click();
  }
  const handleSetDisableNameSubtype = (e) => {
    setValueInputNameSubtype(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }

  const handleValidateType = () => {
    if (valueInputNameSubtype.length === 0) {
      nameSubtype.classList.add('is-invalid');
    }

    if (valueInputNameSubtype.length > 0) {
      nameSubtype.classList.remove('is-invalid');
    }

    if (selectTypes.value.length === 0) {
      selectTypes.classList.add('is-invalid');
    }

    if (selectTypes.value.length > 0) {
      selectTypes.classList.remove('is-invalid');
    }

    if (valueInputNameSubtype.length > 0 && selectTypes.value.length > 0) {
      handleStoreSubtype();
    }

    return true;
  }


  const handleStoreSubtype = () => {

    let active = 0;
    if (typeActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('invst_desc', nameSubtype.value);
    f.append('invst_active', active);
    f.append('invt_id', selectTypes.value);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}invsubtypes`, f, config)
      .then(resp => {

        console.log(resp);
        const { invst_desc } = resp.data.invsubtype;
        setTextModalInstructions(`El subtipo ${invst_desc} fue creado.`);
        document.getElementById('subtypeModalBtn').click();
        handleShowModalSuccess();

      })
      .catch(error => {
        console.warn(error.response);
      });

    return true;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center animate__animated animate__fadeIn">
          <h1 className="text-center mb-0 TitleIndex">Subtipo</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-4 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalSubtype}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0'>Alta de subtipo</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: 14 }} width="140" height="8" />
              </p>
            </div>
          </div>
          <Link to="/store/catalogs" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} width='40%' alt='subtipo busqueda' />
              <p className='mt-2 Chart-title' style={{ fontSize: '12px' }}>Bajas, camios y consulta de subtipo</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -40 }} width="140" height="8" />
              </p>
            </div>
          </Link>
        </div>
      </div>
      <button type="button" id='subtypeModalBtn' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Subtipo</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del subtipo</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameSubtype" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameSubtype" value={valueInputNameSubtype} onChange={(event) => handleSetDisableNameSubtype(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="selectTypes" className="form-label" style={{ fontSize: '15px' }}>2. Tipo</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <select className="form-control" id="selectTypes" disabled={disabledBtnAccept}>
                        <option value="">Selecciona un tipo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="typeActive" className="form-label" style={{ fontSize: '15px' }}>3. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="typeActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="typeActive">Activo</label>
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
                    <button className='btn btn-regresar' onClick={handleValidateType} disabled={disabledBtnAccept}>
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
