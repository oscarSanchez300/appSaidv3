import { Link } from 'react-router-dom';
import typeAdd from '../../../../img/tipoAdd.svg';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../auth/context';
import { AlertTwoBtn } from '../../../../alerts/AlertOneBtn';

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
  const nameType = document.getElementById('nameType')
  const typeActive = document.getElementById('typeActive');

  const [valueInputNameType, setValueInputNameType] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalType = () => {
    document.getElementById('typeBtnModal').click();
  }
  const handleSetDisableNameType = (e) => {
    setValueInputNameType(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateType = () => {
    if (valueInputNameType.length === 0) {
      nameType.classList.add('is-invalid');
    }

    if (valueInputNameType.length > 0) {
      nameType.classList.remove('is-invalid');
      handleStoreType();
    }

    return true;
  }

  const handleStoreType = () => {

    let active = 0;
    if (typeActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('invt_desc', nameType.value);
    f.append('invt_active', active);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}invtypes`, f, config)
      .then(resp => {

        console.log(resp);
        const { invt_desc } = resp.data.invtype;
        setTextModalInstructions(`El tipo ${invt_desc} fue creado.`);
        document.getElementById('typeBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Tipo y Extras</h1>
          <p className='text-center'>Da click donde quieres acceder</p>
          <div className='card mt-4 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalType}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Alta de tipo y asignación de extras</p>
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
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Baja, cambios, consulta de tipo y asignación de extras</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -37 }} width="140" height="8" />
              </p>
            </div>
          </Link>
          <div className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Creador de extras</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: 20 }} width="140" height="8" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <button type="button" id='typeBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Tipo</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del tipo</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameType" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" className="form-control" id="nameType" value={valueInputNameType} onChange={(event) => handleSetDisableNameType(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="typeActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
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
                    <button className='btn btn-regresar' onClick={(event) => handleValidateType(event)} disabled={disabledBtnAccept}>
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
