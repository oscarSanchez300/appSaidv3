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
  const nameSection = document.getElementById('nameSection')
  const sectionActive = document.getElementById('sectionActive');

  const [valueInputNameSection, setValueInputNameSection] = useState('')
  const [disabledBtnAccept, setDisabledBtnAccept] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [textModalInstructions, setTextModalInstructions] = useState('');

  const handleShowModalSection = () => {
    document.getElementById('sectionBtnModal').click();
  }
  const handleSetDisableNameSection = (e) => {
    setValueInputNameSection(e.target.value);
    setDisabledBtnAccept(false);
    return e;
  }
  const handleCloseModalSuccess = () => setDisabledBtnAccept(false);
  const handleShowModalSuccess = () => setShowModalSuccess(true);

  const handleBtnAccept = () => {
    window.location.reload();
    return true;
  }

  const handleValidateSection = () => {
    if (valueInputNameSection.length === 0) {
      nameSection.classList.add('is-invalid');
    }

    if (valueInputNameSection.length > 0) {
      nameSection.classList.remove('is-invalid');
      handleStoreSection();
    }

    return true;
  }


  const handleStoreSection = () => {
    let active = 0;
    if (sectionActive.checked === true) {
      active = 1;
    }

    const f = new FormData();
    f.append('sect_desc', nameSection.value);
    f.append('sect_active', active);
    f.append('int_us_cod', idUser.idUser);
    for (let [name, value] of f) {
      console.log(`${name} : ${value}`);
    }

    axios.post(`${url}sections`, f, config)
      .then(resp => {
        console.log(resp);

        const { sect_desc } = resp.data.section;
        setTextModalInstructions(`La sección ${sect_desc} fue creada.`);
        document.getElementById('sectionBtnModal').click();
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
          <h1 className="text-center mb-0 TitleIndex">Sección</h1>
          <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
          <div className='card mt-2 mb-2 shadow Rectangle-Copy-15' onClick={handleShowModalSection}>
            <div className='card-body text-center'>
              <img src={typeAdd} alt="Productos" width='40%' />
              <p className='mt-2 Chart-title m-0'>Alta de sección</p>
              <p className='text-center'>
                <img src={lineaaImg} alt="Linea" />
              </p>
              <p className='text-center'>
                <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: 14 }} width="140" height="8" />
              </p>
            </div>
          </div>
          <Link to="/store/catalogs" className='card mt-2 mb-2 shadow Rectangle-Copy-15'>
            <div className='card-body text-center'>
              <img src={typeAdd} width='40%' alt='Busqueda de seccion' />
              <p className='mt-2 Chart-title m-0' style={{ fontSize: '12px' }}>Bajas, camios y consulta de sección</p>
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
      <button type="button" id='sectionBtnModal' className="btn btn-primary" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className='text-center Titulos'>Sección</h5>
              <p className='subtitulos text-center'>Escribe y selecciona los detalles del sección</p>
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className="mb-3">
                    <label htmlFor="nameSection" className="form-label" style={{ fontSize: '15px' }}>1. Nombre</label>
                    <div className='input-group'>
                      <span className="ico-tipo"></span>
                      <input type="text" maxLength='10' className="form-control" id="nameSection" value={valueInputNameSection} onChange={(event) => handleSetDisableNameSection(event)} />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <label htmlFor="sectionActive" className="form-label" style={{ fontSize: '15px' }}>2. Activo</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="sectionActive" defaultChecked disabled={disabledBtnAccept} />
                    <label className="form-check-label" htmlFor="sectionActive">Activo</label>
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
                    <button className='btn btn-regresar' disabled={disabledBtnAccept} onClick={handleValidateSection}>
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
