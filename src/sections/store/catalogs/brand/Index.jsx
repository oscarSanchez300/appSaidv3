import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';
import { AuthContext } from '../../../../auth/context';
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
  const nameBrand = document.getElementById('nameBrand')
  const brandActive = document.getElementById('brandActive');


  const [valueInputNameBrand, setValueInputNameBrand] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalBrand = () => {
    document.getElementById('brandBtnModal').click();
  }
  const handleSetDisableNameType = (e) => {
    setValueInputNameBrand(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateBrand = () => {
    if (valueInputNameBrand.length === 0) {
      nameBrand.classList.add('is-invalid');
    }

    if (valueInputNameBrand.length > 0) {
      nameBrand.classList.remove('is-invalid');
      handleStoreBrand();
    }

    return true;
  }

  const handleStoreBrand = () => {

    let active = 0;
    if (brandActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('brand_desc', nameBrand.value);
    f.append('brand_active', active);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}brands`, f, config)
      .then(resp => {
        console.log(resp);

        const { brand_desc } = resp.data.brand;
        setTextModalInstructions(`La marca ${brand_desc} fue creada.`);
        document.getElementById('brandBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Marca</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalBrand}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title'>Alta de marca</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -17 }} width="140" height="8" />
              </p>
            </div>
          </div>
          <Link to="/store/catalogs" className='card mt-2 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} width='40%' alt='Buqueda de marca' />
              <p className='mt-2 Chart-title' style={{ fontSize: '12px' }}>Bajas, camios y consulta de marca</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -38 }} width="140" height="8" />
              </p>
            </div>
          </Link>
        </div>
      </div>
      <button type="button" id='brandBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Marca</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del marca</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameBrand" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameBrand" value={valueInputNameBrand} onChange={(event) => handleSetDisableNameType(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="brandActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="brandActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="brandActive">Activo</label>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateBrand}>
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
