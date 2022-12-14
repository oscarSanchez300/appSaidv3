import { useContext, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { AuthContext } from '../../../auth/context';
import axios from 'axios';

import excelImg from '../../../img/almacen/excel_base.png';
import importExcel from '../../../img/almacen/subir_gris.svg';
import excelFig from '../../../img/almacen/excel_figura.svg';

export const Departures = () => {

    const arrayTh = ['Serie', 'Cedis', 'Ubicacion', 'Seccion', 'Pasillo', 'Lugar', 'Cantidad', 'Cedis Destino', 'Ubicacion Destino', 'Seccion Destino', 'Pasillo Destino', 'Lugar Destino'];
    const url = process.env.REACT_APP_API_URL;
    const { token, idUser } = useContext(AuthContext);
    const configF = {
        headers: {
            'Content-Type': 'application/json, multipart/form-data',
            'Authorization': 'Bearer ' + token
        },
    };
    const tableRef = useRef();
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Productos excel',
        sheet: 'Productos'
    });


    const handleClickTable = () => {

        const tbodyTable = document.getElementById('tbodyTable');
        while (tbodyTable.firstChild) {
            tbodyTable.removeChild(tbodyTable.firstChild);
        }

        arrayTh.map(itemTh => {
            const th = document.createElement('th');
            th.value = itemTh;
            th.innerText = itemTh;
            tbodyTable.append(th);
            return itemTh;
        });

        onDownload();
    }

    const [FileR, setFileR] = useState('');
    const [showImg, setShowImg] = useState(true);
    const [showBtnSend, setShowBtnSend] = useState(false);


    const loadExcel = () => {
        const fileExcel = document.getElementById('fileExcel');
        fileExcel.click();
        let errorExcelID = document.getElementById('errorExcelID');
        while (errorExcelID.firstChild) {
            errorExcelID.removeChild(errorExcelID.firstChild);
        }
        return true;

    }

    const handleDragover = (e) => {
        e.preventDefault();
        document.getElementById('dropArea').style.borderColor = 'rgb(99, 180, 77)';
        return e;
    }

    const handleDragleave = (e) => {
        e.preventDefault();
        document.getElementById('dropArea').style.borderColor = '#5BC5F2';
        return e;
    }

    const handleDrop = (e) => {
        let errorExcelID = document.getElementById('errorExcelID');
        setShowImg(true);
        if (e.dataTransfer.files.length <= 0) return;

        while (errorExcelID.firstChild) {
            errorExcelID.removeChild(errorExcelID.firstChild);
        }

        e.preventDefault();
        setFileR(e.dataTransfer.files[0]);
        setShowImg(false);
        console.log(FileR);
        return e;
    }

    const handleChangeInputFile = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0]);
            setFileR(e.target.files[0]);
            setShowImg(false);
            console.log(FileR);
        } else {
            setFileR('');
            setShowImg(true);
        }

        return e;
    }

    const sendExcel = () => {

        setShowBtnSend(true);
        setShowImg(true);
        const f = new FormData();
        f.append('file_inventory', FileR);
        f.append('int_us_cod', idUser);

        axios.post(`${url}loadinventoryoutputs`, f, configF)
            .then(res => {
                console.log(res);
                setFileR('');
                setShowImg(true);
                document.getElementById('fileExcel').value = '';
                setShowBtnSend(false);

            })
            .catch(error => {
                console.log(error.response);

                setFileR('');
                setShowImg(true);
                document.getElementById('fileExcel').value = '';
                setShowBtnSend(false);

                let errorExcelID = document.getElementById('errorExcelID');
                while (errorExcelID.firstChild) {
                    errorExcelID.removeChild(errorExcelID.firstChild);
                }


                if (error.response.status === 500) {
                    const li = document.createElement('li');
                    li.innerHTML = 'Ocurrio un error interno';
                    li.classList.add('text-start');
                    errorExcelID.append(li);
                }

                if (error.response.data.status === 500) {
                    const li = document.createElement('li');
                    li.innerHTML = error.response.data.message;
                    li.classList.add('text-start');
                    errorExcelID.append(li);
                }

                if (error.response.status === 409 && error.response.data.status === 409 && error.response.data.message === "La plantilla no coincide, debe tener las columnas: 'serie','cedis','ubicacion','seccion','pasillo','lugar','cantidad','cedis_destino','ubicacion_destino','seccion_destino','pasillo_destino','lugar_destino'") {

                    console.log('error en plantilla')
                    const li = document.createElement('li');
                    let textFormartR = error.response.data.message.replaceAll("'", ' ').replaceAll('[', ' ').replaceAll(']', ' ');
                    li.innerHTML = textFormartR;
                    li.classList.add('text-justify');
                    errorExcelID.append(li);
                }

                if (error.response.status !== 500 && error.response.data.status !== 500) {
                    if (error.response.data.errors?.length > 0) {

                        error.response.data.errors.map(error => {
                            const li = document.createElement('li');
                            li.innerHTML = ' [Fila: ' + error.row + '] [Columna: ' + error.attribute + '] ' + error.errors[0];
                            li.classList.add('text-start');
                            errorExcelID.append(li);

                            return error;
                        });

                    }
                }

            });

        return f;
    }


    return (
        <>
            <div className="container animate__animated animate__fadeIn">
                <div className="row justify-content-center">
                    <h1 className="text-center mb-0 TitleIndex">Carga de Salidas</h1>
                    <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
                </div>
                <div className="row justify-content-evenly mt-4 mb-4">
                    <div className="col-md-5 Rectngulo-3105 p-4">
                        <div className="row justify-content-center">
                            <label className="form-label text-center mt-4" style={{ fontSize: '15px' }}>1. Descarga plantilla</label>
                            <img src={excelImg} onClick={handleClickTable} alt="Icon excel" className='Rectngulo-20304 img-responsivee' />
                        </div>
                    </div>
                    <div className="col-md-5 Rectngulo-3105 p-4">
                        <div className="row justify-content-center">
                            <h5 className='text-center mb-4' style={{ color: '#7CBE3A' }}>2. Sube tu archivo</h5>
                            <div className='TrazadoModal shadow-lg' id="dropArea" onDragOver={(event) => handleDragover(event)} onDragLeave={(event) => handleDragleave(event)} onDrop={(event) => handleDrop(event)}>
                                <p className='text-center' style={{ marginTop: '25%', display: showImg ? 'block' : 'none' }}>
                                    <img src={importExcel} className='img-fluid' alt="Subir archivo" />
                                </p>
                                <p className='text-center' style={{ marginTop: '25%', display: !showImg ? 'block' : 'none' }}>
                                    <img src={excelFig} alt="Subir archivo" height="75px" />
                                </p>
                                <p className="Arrastra-click m-0 p-0" style={{ display: showImg ? 'block' : 'none' }} id="text_load">Arrastra o haz click <b onClick={loadExcel} style={{ cursor: 'pointer', color: '#0d6efd' }}>aqu??</b><br />para subir tu archivo</p>
                                <p className="Arrastra-click m-0 p-0" style={{ display: !showImg ? 'block' : 'none' }} id="text_load">Arrastra o haz click <b onClick={loadExcel} style={{ cursor: 'pointer', color: '#0d6efd' }}>aqu??</b><br />para cambiar tu archivo</p>
                            </div>
                            <input type="file" id="fileExcel" onChange={(event) => handleChangeInputFile(event)} style={{ display: 'none' }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-12 text-center" style={{ display: !showImg ? 'block' : 'none' }}>
                                <button onClick={sendExcel} id="btnSendExecelID" className="btn btn-regresar shadow-lg desaparece">Enviar</button>
                            </div>
                            <div className="col-md-12 text-center" style={{ display: showBtnSend ? 'block' : 'none' }}>
                                <button id="loadingBtn" className="btn btn-primary" style={{ borderRadius: '25px' }} type="button" disabled>
                                    Subiendo
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-4">
                            <div className="col-md-12">
                                <ul className="text-center" id="errorExcelID"></ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <button onClick={onDownload}> Export excel </button> */}
            <table ref={tableRef} style={{ display: 'none' }} >
                <tbody>
                    <tr id='tbodyTable'></tr>
                </tbody>
            </table>
        </>
    )
}
