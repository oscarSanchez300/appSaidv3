import { useContext, useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { AuthContext } from '../../../auth/context';
import { useFetch } from '../../../hooks/useFetch';
import axios from 'axios';

import excelImg from '../../../img/almacen/excel_base.png'
import importExcel from '../../../img/almacen/subir_gris.svg';
import excelFig from '../../../img/almacen/excel_figura.svg';

export const ProductEntry = () => {


    const arrayTh = ['Serie', 'Disponible', 'Tipo', 'Subtipo', 'Marca', 'Modelo', 'Estatus', 'Cliente', 'Origen', 'Cantidad', 'Cedis', 'Ubicacion', 'Seccion', 'Pasillo', 'Lugar'];
    const url = process.env.REACT_APP_API_URL;
    const { token, idUser } = useContext(AuthContext);
    const configF = {
        headers: {
            'Content-Type': 'application/json, multipart/form-data',
            'Authorization': 'Bearer ' + token
        },
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    const selectTypes = document.getElementById('selectTypes');

    const tableRef = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Productos excel',
        sheet: 'Productos'
    });


    const getType = () => {


        let id_type = selectTypes.value;

        axios.get(`${url}invtypes/${id_type}`, config)
            .then(resp => {

                // console.log(resp);

                const tbodyTable = document.getElementById('tbodyTable');
                const valuesTable = document.getElementById('valuesTable');
                const {
                    invextratypes,
                    invt_desc
                } = resp.data.invtype;
                console.log(invextratypes);

                invextratypes.map(itemTh => {
                    const th = document.createElement('th');
                    th.value = itemTh.invexttype_json.etiqueta;
                    th.innerText = itemTh.invexttype_json.etiqueta;
                    tbodyTable.append(th);
                    return itemTh;
                });

                arrayTh.map((thElement, index) => {
                    const td = document.createElement('td');
                    if (index === 2) {
                        td.innerHTML = invt_desc;
                    } else {
                        td.innerHTML = '';
                    }
                    valuesTable.append(td);

                    return thElement;
                });

                selectTypes.value = '';

                onDownload();

            })
            .catch(error => {
                console.log(error.response);
            });

        return id_type;
    }

    const handleClickTable = () => {

        if (selectTypes.value.length === 0) {
            selectTypes.classList.add('is-invalid');
            return false;
        }
        selectTypes.classList.remove('is-invalid');

        const tbodyTable = document.getElementById('tbodyTable');
        const valuesTable = document.getElementById('valuesTable');
        while (tbodyTable.firstChild) {
            tbodyTable.removeChild(tbodyTable.firstChild);
        }
        while (valuesTable.firstChild) {
            valuesTable.removeChild(valuesTable.firstChild);
        }

        // const tr = document.createElement('tr');
        arrayTh.map(itemTh => {
            const th = document.createElement('th');
            th.value = itemTh;
            th.innerText = itemTh;
            // tr.append(th);
            tbodyTable.append(th);
            return itemTh;
        });

        getType();

    }

    const [FileR, setFileR] = useState('');
    const [showImg, setShowImg] = useState(true);
    const [showBtnSend, setShowBtnSend] = useState(false);

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

        axios.post(`${url}loadinventory`, f, configF)
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

                if (error.response.status === 409 && error.response.data.status === 409 && error.response.data.message === "La plantilla no coincide, debe tener las columnas: 'serie','cedis','ubicacion','seccion','pasillo','lugar','cantidad','cedis_destino','ubicacion_destino','seccion_destino','pasillo_destino','lugar_destino', mas los extras") {

                    console.log('error en plantilla')
                    const li = document.createElement('li');
                    let textFormartR = error.response.data.message.replaceAll("'", ' ').replaceAll('[', ' ').replaceAll(']', ' ');
                    li.innerHTML = textFormartR;
                    li.classList.add('text-start');
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
                    <h1 className="text-center mb-0 TitleIndex">Carga de Productos y Entradas</h1>
                    <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
                </div>
                <div className="row justify-content-evenly mt-4 mb-4">
                    <div className="col-md-5 Rectngulo-3105 p-4">
                        <div className="row justify-content-center">
                            <div className='col-md-8'>
                                <label htmlFor="TypeImort" className="form-label text-start" style={{ fontSize: '15px' }}>1. Tipo</label>
                                <div className='input-group'>
                                    <span className="ico-tipo"></span>
                                    <select type="text" className="form-control" id="selectTypes">
                                        <option value="">Selecciona el tipo</option>
                                    </select>
                                </div>
                            </div>
                            <label className="form-label text-center mt-4" style={{ fontSize: '15px' }}>2. Descarga plantilla</label>
                            <img src={excelImg} onClick={handleClickTable} alt="Icon excel" className='Rectngulo-20304 img-responsivee' />
                        </div>
                    </div>
                    <div className="col-md-5 Rectngulo-3105 p-4">
                        <div className="row justify-content-center">
                            <h5 className='text-center mb-4' style={{ color: '#7CBE3A' }}>3. Sube tu archivo</h5>
                            <div className='TrazadoModal shadow-lg' id="dropArea" onDragOver={(event) => handleDragover(event)} onDragLeave={(event) => handleDragleave(event)} onDrop={(event) => handleDrop(event)}>
                                <p className='text-center' style={{ marginTop: '25%', display: showImg ? 'block' : 'none' }}>
                                    <img src={importExcel} className='img-fluid' alt="Subir archivo" />
                                </p>
                                <p className='text-center' style={{ marginTop: '25%', display: !showImg ? 'block' : 'none' }}>
                                    <img src={excelFig} alt="Subir archivo" height="75px" />
                                </p>
                                <p className="Arrastra-click m-0 p-0" style={{ display: showImg ? 'block' : 'none' }} id="text_load">Arrastra o haz click <b onClick={loadExcel} style={{ cursor: 'pointer', color: '#0d6efd' }}>aquí</b><br />para subir tu archivo</p>
                                <p className="Arrastra-click m-0 p-0" style={{ display: !showImg ? 'block' : 'none' }} id="text_load">Arrastra o haz click <b onClick={loadExcel} style={{ cursor: 'pointer', color: '#0d6efd' }}>aquí</b><br />para cambiar tu archivo</p>
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
                    <tr id='valuesTable'></tr>
                </tbody>
            </table>
        </>
    )
}
