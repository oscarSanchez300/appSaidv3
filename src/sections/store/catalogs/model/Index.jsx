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
  const nameModel = document.getElementById('nameModel')
  const selectBrand = document.getElementById('selectBrand');
  const modelActive = document.getElementById('modelActive');


  const stateTypes = useFetch(`${url}brands`)
  const { loading: loadingType, data: dataBrand } = stateTypes
  console.log(!loadingType && dataBrand)

  useEffect(() => {
    dataBrand &&
      dataBrand.brands.map(brand => {
        const option = document.createElement('option');
        option.value = brand.brand_id;
        option.innerHTML = brand.brand_desc;
        selectBrand.append(option);
        return selectBrand;
      })
  }, [dataBrand, selectBrand])

  const [valueInputNameModel, setValueInputNameModel] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalModel = () => {
    document.getElementById('modelBtnModel').click();
  }
  const handleSetDisableNameBrand = (e) => {
    setValueInputNameModel(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateModel = () => {
    if (valueInputNameModel.length === 0) {
      nameModel.classList.add('is-invalid');
    }

    if (valueInputNameModel.length > 0) {
      nameModel.classList.remove('is-invalid');
    }

    if (selectBrand.value.length === 0) {
      selectBrand.classList.add('is-invalid');
    }

    if (selectBrand.value.length > 0) {
      selectBrand.classList.remove('is-invalid');
    }

    if (valueInputNameModel.length > 0 && selectBrand.value.length > 0) {
      handleStoreModel();
    }

    return true;
  }

  const handleStoreModel = () => {
    let active = 0;
    if (modelActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('inv_model_desc', nameModel.value);
    f.append('inv_model_active', active);
    f.append('brand_id', selectBrand.value);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}models`, f, config)
      .then(resp => {
        console.log(resp);

        const { inv_model_desc } = resp.data.invmodel;
        setTextModalInstructions(`El modelo ${inv_model_desc} fue creado.`);
        document.getElementById('modelBtnModel').click();
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
          <h1 className="text-center mb-0 TitleIndex">Modelo</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalModel}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title'>Alta de modelo</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -18 }} width="140" height="8" />
              </p>
            </div>
          </div>
          <Link to="/store/catalogs" className='card mt-2 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} width='40%' alt='Busqueda de modelo' />
              <p className='mt-2 Chart-title' style={{ fontSize: '12px' }}>Bajas, camios y consulta de modelo</p>
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
      <button type="button" id='modelBtnModel' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Modelo</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del modelo</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameModel" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameModel" value={valueInputNameModel} onChange={(event) => handleSetDisableNameBrand(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="selectBrand" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <select className="form-control" id="selectBrand" disabled={disabledBtnAccept}>
                        <option value="">Selecciona una marca</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="modelActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="modelActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="modelActive">Activo</label>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateModel}>
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
