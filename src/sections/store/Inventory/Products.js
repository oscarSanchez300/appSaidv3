import { useContext, useEffect, useRef, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import axios from 'axios';
import { AuthContext } from '../../../auth/context';
import { AlertTwoBtn } from '../../../alerts/AlertTwoBtn';



export const Products = (props) => {

    const url = process.env.REACT_APP_API_URL
    const { token, idUser } = useContext(AuthContext);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    let numSerie_ID = document.getElementById('numSerie_ID')
    const client_ID = document.getElementById('client_ID')
    const type_ID = document.getElementById('type_ID')
    const subtype_ID = document.getElementById('subtype_ID')
    const bran_ID = document.getElementById('bran_ID')
    const model_ID = document.getElementById('model_ID')
    const status_ID = document.getElementById('status_ID')
    const available_id = document.getElementById('available_id');
    const contentExtras = document.getElementById('contentExtras');
    const extrasMB = document.getElementById('extrasMB')
    const btnSaveProduct = document.getElementById('btnSaveProduct');

    const isMounted = useRef(true);

    const [disabledClient, setDisabledClient] = useState(true)
    const [disabledType, setDisabledType] = useState(true)
    const [disabledSubtype, setDisabledSubtype] = useState(true)
    const [disabledBrand, setDisabledBrand] = useState(true)
    const [disabledModel, setDisabledModel] = useState(true)
    const [disabledStatus, setDisabledStatus] = useState(true)

    const [showModal, setShowModal] = useState(false);
    const [showModalDos, setShowModalDos] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleCloseModalDos = () => setShowModalDos(false);
    const handleShowModal = () => {
        handleCloseModalDos();
        setShowModal(true)
    };
    const handleShowModalDos = () => setShowModalDos(true);

    const [TextModalBody, setTextModalBody] = useState('');
    const handleAccionBtnAccept = () => {
        window.location.reload();
    }
    const handleAccionBtnCancel = () => {
        window.location.href = '/wh';
    }
    const textModalInstructions = 'Si quieres dar un nuevo producto da click en dar de alta, de lo contrario da click en regresar a almacén';


    const state = useFetch(`${url}companies`)
    const { loading, data } = state
    console.log(!loading && data)

    const stateTypes = useFetch(`${url}invtypes`)
    const { loading: loadingType, data: dataType } = stateTypes
    console.log(!loadingType && dataType)

    const stateBrands = useFetch(`${url}brands`)
    const { loading: loadingBrand, data: dataBrand } = stateBrands
    console.log(!loadingBrand && dataBrand)

    const stateStatus = useFetch(`${url}invstatuses`)
    const { loading: loadingStatus, data: dataStatus } = stateStatus
    console.log(!loadingStatus && dataStatus)

    const handleSetDisableClient = () => {
        if (numSerie_ID.value.length > 0) {
            setDisabledClient(false);
        }
    }

    const handleSetDisableType = () => {
        if (client_ID.value.length > 0) {
            setDisabledType(false);
        }
    }

    const handaleGetSubtypes = (id_type) => {


        console.log(type_ID.value.length > 0)
        while (subtype_ID.firstChild) {
            subtype_ID.removeChild(subtype_ID.firstChild)
        }

        while (extrasMB.firstChild) {
            extrasMB.removeChild(extrasMB.firstChild);
        }

        extrasMB.classList.add('animate__animated', 'animate__zoomIn')

        if (type_ID.value.length > 0) {

            const option = document.createElement('option')
            option.value = ''
            option.innerHTML = 'Selecciona un subtipo'
            subtype_ID.append(option)

            if (isMounted.current) {
                axios.get(`${url}invtypes/${id_type}/subtypes`, config)
                    .then(resp => {
                        console.log(resp)
                        const { invsubtypes, invextratypes
                        } = resp.data.invtype;

                        invsubtypes.map(subtype => {
                            const option = document.createElement('option')
                            option.value = subtype.invst_id
                            option.innerHTML = subtype.invst_desc
                            subtype_ID.append(option)
                            return subtype;
                        })

                        localStorage.setItem('extrasRefenceAdd', JSON.stringify(invextratypes));

                        invextratypes.map(extras => {
                            if (extras.invexttype_json.elemento === 'select') {
                                const col = document.createElement('div');
                                col.classList.add('col-md-5', 'mt-4');

                                const labelSelect = document.createElement('label');
                                labelSelect.classList.add('-Nmero-de-serie', 'mb-2');
                                labelSelect.innerHTML = extras.invexttype_json.etiqueta;
                                labelSelect.htmlFor = extras.invexttype_json.nombre;
                                labelSelect.style.fontSize = '15px'

                                const divIcon = document.createElement('div');
                                divIcon.classList.add('input-icons');

                                const imgSelect = document.createElement('img');
                                imgSelect.classList.add('icon');
                                imgSelect.src = extras.invexttype_json.imgURL;

                                const selectDocument = document.createElement('select');
                                selectDocument.style.border = '3px solid #004698';
                                selectDocument.id = extras.invexttype_json.nombre;
                                selectDocument.name = extras.invexttype_json.nombre;
                                selectDocument.classList.add('input-field', 'form-control', 'Rectngulo-3033');

                                let valuesSelect = extras.invexttype_json.valor;
                                let arrayValuesSelect = valuesSelect.split(',');

                                arrayValuesSelect.map(valueR => {
                                    const option = document.createElement('option');
                                    option.value = valueR;
                                    option.innerHTML = valueR;
                                    option.classList.add('text-start')
                                    selectDocument.append(option);

                                    return valueR;
                                });

                                col.append(labelSelect);
                                divIcon.append(imgSelect);
                                divIcon.append(selectDocument);
                                col.append(divIcon);
                                extrasMB.append(col);
                            }
                            if (extras.invexttype_json.elemento === 'input') {
                                let typeDocument = extras.invexttype_json.tipo;
                                switch (typeDocument) {

                                    case 'text':
                                        const colText = document.createElement('div');
                                        colText.classList.add('col-md-5', 'mt-4');

                                        const labelText = document.createElement('label');
                                        labelText.classList.add('-Nmero-de-serie', 'mb-2');
                                        labelText.innerHTML = extras.invexttype_json.etiqueta;
                                        labelText.htmlFor = extras.invexttype_json.nombre;
                                        labelText.style.fontSize = '15px'


                                        const divIconText = document.createElement('div');
                                        divIconText.classList.add('input-icons');

                                        const imgText = document.createElement('img');
                                        imgText.classList.add('icon');
                                        imgText.src = extras.invexttype_json.imgURL;

                                        const inputText = document.createElement('input');
                                        inputText.type = extras.invexttype_json.tipo;
                                        inputText.classList.add('input-field', 'form-control', 'Rectngulo-3033', 'text-start');
                                        inputText.name = extras.invexttype_json.nombre;
                                        inputText.id = extras.invexttype_json.nombre;
                                        // inputText.value = extras.inventory_invextras.inv_value;


                                        colText.append(labelText);
                                        colText.append(divIconText);
                                        divIconText.append(imgText);
                                        divIconText.append(inputText);
                                        extrasMB.append(colText);

                                        break;

                                    case 'date':
                                        const colDate = document.createElement('div');
                                        colDate.classList.add('col-md-5', 'mt-4');
                                        const inputDate = document.createElement('input');

                                        const labelDate = document.createElement('label');
                                        labelDate.classList.add('-Nmero-de-serie', 'mb-2');
                                        labelDate.innerHTML = extras.invexttype_json.etiqueta;
                                        labelDate.htmlFor = extras.invexttype_json.nombre;
                                        labelDate.style.fontSize = '15px'

                                        const divIconDate = document.createElement('div');
                                        divIconDate.classList.add('input-icons');

                                        const imgDate = document.createElement('img');
                                        imgDate.classList.add('icon');
                                        imgDate.src = extras.invexttype_json.imgURL;

                                        inputDate.type = extras.invexttype_json.tipo;
                                        inputDate.classList.add('input-field', 'form-control', 'Rectngulo-3033', 'text-start');
                                        inputDate.name = extras.invexttype_json.nombre;
                                        inputDate.id = extras.invexttype_json.nombre;
                                        // inputDate.value = extras.inventory_invextras.inv_value;
                                        // console.log(extras.inventory_invextras.created_at.slice(0, 10).replaceAll('-', '/'));


                                        colDate.append(labelDate);
                                        colDate.append(divIconDate);
                                        divIconDate.append(imgDate);
                                        divIconDate.append(inputDate);
                                        extrasMB.append(colDate);

                                        break;

                                    case 'radio':
                                        let valuesRadio = extras.invexttype_json.valor;
                                        let arrayValuesRadio = valuesRadio.split(',');

                                        const divRadio = document.createElement('div');
                                        divRadio.classList.add('col-md-5', 'mb-2');

                                        const pTitleRadio = document.createElement('p');
                                        pTitleRadio.innerHTML = extras.invexttype_json.etiqueta;
                                        pTitleRadio.classList.add('-Nmero-de-serie', 'mb-3', 'mt-4');
                                        divRadio.append(pTitleRadio);
                                        const pContainerRadio = document.createElement('p');

                                        arrayValuesRadio.map((valueRadio, index) => {
                                            const radio = document.createElement('input');
                                            const label = document.createElement('label');


                                            const imgRadio = document.createElement('img');
                                            imgRadio.style.height = '18';
                                            imgRadio.style.marginRight = '4%';
                                            const urlStrings = extras.invexttype_json.imgURL;
                                            const arrrayURL = urlStrings.split(',');
                                            imgRadio.src = arrrayURL[index].trim();

                                            radio.type = 'radio';
                                            radio.name = extras.invexttype_json.nombre;
                                            radio.id = extras.invexttype_json.nombre + valueRadio + index;
                                            radio.value = valueRadio;
                                            radio.style.marginRight = '4%';
                                            console.log('hola')
                                            if (parseInt(extras.invexttype_json.defaultcheck) === index) {
                                                radio.checked = true;
                                            }




                                            label.htmlFor = extras.invexttype_json.nombre + valueRadio + index;
                                            label.innerHTML = valueRadio;
                                            label.style.marginRight = '9%';
                                            label.style.fontSize = '15px';


                                            divRadio.append(pContainerRadio);
                                            pContainerRadio.append(imgRadio);
                                            pContainerRadio.append(radio);
                                            pContainerRadio.append(label);

                                            extrasMB.append(divRadio);

                                            return valueRadio;
                                        });
                                        break;

                                    case 'checkbox':
                                        let valuesCheckbox = extras.invexttype_json.valor;
                                        let arrayValuesCheckbox = valuesCheckbox.split(',');

                                        const divCheckbox = document.createElement('div');
                                        divCheckbox.classList.add('col-md-5', 'mb-2');

                                        const pTitleCheckbox = document.createElement('p');
                                        pTitleCheckbox.innerHTML = extras.invexttype_json.etiqueta;
                                        pTitleCheckbox.classList.add('-Nmero-de-serie', 'mb-3', 'mt-4');
                                        divCheckbox.append(pTitleCheckbox);
                                        const pContainerCheckbox = document.createElement('p');

                                        arrayValuesCheckbox.map((valueRadio, index) => {
                                            const checkbox = document.createElement('input');
                                            const label = document.createElement('label');


                                            const imgRadio = document.createElement('img');
                                            imgRadio.style.height = '18';
                                            imgRadio.style.marginRight = '2%';
                                            const urlStrings = extras.invexttype_json.imgURL;
                                            const arrrayURL = urlStrings.split(',');
                                            imgRadio.src = arrrayURL[index].trim();

                                            checkbox.type = 'checkbox';
                                            checkbox.name = extras.invexttype_json.nombre;
                                            checkbox.id = extras.invexttype_json.nombre + valueRadio + index;
                                            checkbox.value = valueRadio;
                                            checkbox.style.marginRight = '2%';

                                            if (parseInt(extras.invexttype_json.defaultcheck) === index) {
                                                checkbox.checked = true;
                                            }

                                            label.htmlFor = extras.invexttype_json.nombre + valueRadio + index;
                                            label.innerHTML = valueRadio;
                                            label.style.marginRight = '4%';
                                            label.style.fontSize = '15px';



                                            divCheckbox.append(pContainerCheckbox);
                                            pContainerCheckbox.append(imgRadio);
                                            pContainerCheckbox.append(checkbox);
                                            pContainerCheckbox.append(label);

                                            extrasMB.append(divCheckbox);

                                            return valueRadio;
                                        });


                                        const pMsgError = document.createElement('p');
                                        pMsgError.id = extras.invexttype_json.nombre + 'msgError';
                                        pMsgError.innerText = 'Debes seleccionar al menos una opción';
                                        pMsgError.classList.add('text-danger');
                                        pMsgError.style.display = 'none';
                                        divCheckbox.append(pMsgError);

                                        break;

                                    default:
                                        break;
                                }

                            }
                            return extras;
                        })
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            }


        }

    }

    const handleSetDisableSubtype = () => {
        if (type_ID.value.length > 0) {
            setDisabledSubtype(false);
        }
        handaleGetSubtypes(type_ID.value)
    }

    const handaleGetModel = (id_brand) => {

        while (model_ID.firstChild) {
            model_ID.removeChild(model_ID.firstChild)
        }

        console.log('modelos')

        if (bran_ID.value.length > 0) {

            const option = document.createElement('option')
            option.value = ''
            option.innerHTML = 'Selecciona un modelo'
            model_ID.append(option)

            if (isMounted.current) {
                axios.get(`${url}brands/${id_brand}/models`, config)
                    .then(resp => {
                        console.log(resp)
                        const { invmodels
                        } = resp.data.brand;

                        invmodels.map(model => {
                            const option = document.createElement('option')
                            option.value = model.inv_model_id
                            option.innerHTML = model.inv_model_desc
                            model_ID.append(option)
                            return model;
                        })
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            }


        }

    }

    const handleSetDisableBrand = () => {
        if (subtype_ID.value.length > 0) {
            setDisabledBrand(false);
        }
    }

    const handleSetDisableModel = () => {
        if (bran_ID.value.length > 0) {
            setDisabledModel(false);
        }
        handaleGetModel(bran_ID.value)
    }

    const handleSetDisableStatus = () => {
        if (model_ID.value.length > 0) {
            setDisabledStatus(false);
        }
    }

    const handleShowExtras = () => {
        if (status_ID.value.length > 0) {
            contentExtras.style.display = 'block';
            btnSaveProduct.style.display = 'block';
        }
    }

    const handleStoreInventory = () => {
        const extrasText = localStorage.getItem('extrasRefenceAdd');
        const extrasArray = JSON.parse(extrasText);
        console.log(extrasArray);
        const f = new FormData();


        let numSerialVal = numSerie_ID.value;

        if (numSerie_ID === 'SIN SERIE') {
            f.append('operation', 0);
            numSerie_ID = numSerie_ID + Math.random();
        } else {
            f.append('operation', 1);
        }

        let available_id_R = 0;
        if (available_id.checked === true) {
            available_id_R = 1;
        }

        if (available_id.checked === false) {
            available_id_R = 0;
        }

        f.append('int_us_cod', idUser.idUser);
        f.append('serialNumber', numSerialVal);
        f.append('company_id', client_ID.value);
        f.append('invt_id', type_ID.value);
        f.append('invst_id', subtype_ID.value);
        f.append('brand_id', bran_ID.value);
        f.append('inv_model_id', model_ID.value);
        f.append('inv_statuses_id', status_ID.value);
        f.append('inv_available', parseInt(available_id_R));


        //Mapeo donde se agregan los extras dependiendo su tipo es la forma de obtener el valor
        extrasArray.map(extraUpdate => {
            if ((extraUpdate.invexttype_json.elemento === 'select' || extraUpdate.invexttype_json.elemento === 'input') && (extraUpdate.invexttype_json.tipo !== 'radio' && extraUpdate.invexttype_json.tipo !== 'checkbox')) {
                const indexName = extraUpdate.invexttype_json.nombre;

                if (extraUpdate.invexttype_required === 1 && document.getElementById(indexName).value.length === 0) {
                    handleCloseModalDos();
                    document.getElementById(indexName).classList.add('is-invalid');
                }
                if (extraUpdate.invexttype_required === 1 && document.getElementById(indexName).value.length > 0) {
                    document.getElementById(indexName).classList.remove('is-invalid');
                }

                f.append(indexName, document.getElementById(indexName).value);
            }

            if (extraUpdate.invexttype_json.tipo === 'radio') {
                const indexName = extraUpdate.invexttype_json.nombre;
                f.append(indexName, document.querySelector(`input[name=${indexName}]:checked`).value);
            }

            if (extraUpdate.invexttype_json.tipo === 'checkbox') {
                let valuesCheckboxCreateExtra = '';
                const indexName = extraUpdate.invexttype_json.nombre;

                const valuesCheckboxExtras = document.getElementsByName(indexName);
                console.log(valuesCheckboxExtras);
                valuesCheckboxExtras.forEach(element => {
                    if (element.checked === true) {
                        valuesCheckboxCreateExtra += element.value + ',';
                    }
                });

                console.log('valores del checkbox: ' + valuesCheckboxCreateExtra.length)

                if (extraUpdate.invexttype_required === 1 && valuesCheckboxCreateExtra.length === 0) {
                    let msgErrorCheckboxStore = document.getElementById(indexName + 'msgError');
                    msgErrorCheckboxStore.style.display = 'block';
                    handleCloseModalDos();
                }

                if (extraUpdate.invexttype_required === 1 && valuesCheckboxCreateExtra.length > 0) {
                    let msgErrorCheckboxStore = document.getElementById(indexName + 'msgError');
                    msgErrorCheckboxStore.style.display = 'none';
                }

                f.append(indexName, valuesCheckboxCreateExtra.substring(0, valuesCheckboxCreateExtra.length - 1));

            }

            return extraUpdate;
        });


        for (const pair of f.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        localStorage.setItem('serialNumberModal', numSerialVal);

        axios({
            url: `${url}inventories`,
            method: "POST",
            data: f,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(resp => {
                console.log(resp.data);

                const { serialNumber } = resp.data.inventory;

                let textInfoModal = `El producto con No. de Serie ${serialNumber} ha sido dado de alta exitosamente.`
                handleShowModal();
                setTextModalBody(textInfoModal)


            })
            .catch(error => {
                console.log(error.response);
            });

        return true;
    }


    // Mounted
    useEffect(() => {
        console.log('mounted');

        return () => {
            console.log('unmounted');
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        data &&
            data.companies.map(companie => {
                const option = document.createElement('option')
                option.value = companie.company_id
                option.innerHTML = companie.company_desc
                client_ID.append(option)
                return client_ID;
            })
    }, [data, client_ID])

    useEffect(() => {
        dataType &&
            dataType.invtypes.map(type => {
                const option = document.createElement('option')
                option.value = type.invt_id
                option.innerHTML = type.invt_desc
                type_ID.append(option)
                return type_ID;
            })
    }, [dataType, type_ID])

    useEffect(() => {
        dataBrand &&
            dataBrand.brands.map(brand => {
                const option = document.createElement('option')
                option.value = brand.brand_id
                option.innerHTML = brand.brand_desc
                bran_ID.append(option)
                return brand;
            })
    }, [dataBrand, bran_ID])

    useEffect(() => {
        dataStatus &&
            dataStatus.invstatus.map(status => {
                const option = document.createElement('option')
                option.value = status.inv_statuses_id
                option.innerHTML = status.inv_statuses_desc
                status_ID.append(option)
                return status;
            })
    }, [dataStatus, status_ID])


    return (
        <>
            <div className='container Rectngulo-3105 mb-4'>
                <form className='' style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <div className='row justify-content-evenly'>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="numSerie_ID" className="form-label" style={{ fontSize: '15px' }}>1. Número de Serie</label>
                                <div className='input-group'>
                                    <span className="ico-serie"></span>
                                    <input type="text" className="form-control" id="numSerie_ID" placeholder='Escribe el número de serie' onChange={handleSetDisableClient} />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="client_ID" className="form-label" style={{ fontSize: '15px' }}>2. Cliente</label>
                                <div className='input-group'>
                                    <span className="ico-cliente"></span>
                                    <select className="form-control" id="client_ID" style={{ borderColor: '#004899' }} disabled={disabledClient} onChange={handleSetDisableType}>
                                        <option>Selecciona un cliente</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-evenly'>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="type_ID" className="form-label" style={{ fontSize: '15px' }}>3. Tipo</label>
                                <div className='input-group'>
                                    <span className="ico-tipo"></span>
                                    <select className="form-control" id="type_ID" style={{ borderColor: '#004899' }} disabled={disabledType} onChange={handleSetDisableSubtype}>
                                        <option value="">Selecciona un tipo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="subtype_ID" className="form-label" style={{ fontSize: '15px' }}>4. Subtipo</label>
                                <div className='input-group'>
                                    <span className="ico-tipo"></span>
                                    <select className="form-control" id="subtype_ID" style={{ borderColor: '#004899' }} disabled={disabledSubtype} onChange={handleSetDisableBrand}>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-evenly'>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="bran_ID" className="form-label" style={{ fontSize: '15px' }}>5. Marca</label>
                                <div className='input-group'>
                                    <span className="ico-marca"></span>
                                    <select className="form-control" id="bran_ID" style={{ borderColor: '#004899' }} disabled={disabledBrand} onChange={handleSetDisableModel}>
                                        <option value="">Selecciona una marca</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="model_ID" className="form-label" style={{ fontSize: '15px' }}>6. Modelo</label>
                                <div className='input-group'>
                                    <span className="ico-marca"></span>
                                    <select className="form-control" id="model_ID" style={{ borderColor: '#004899' }} disabled={disabledModel} onChange={handleSetDisableStatus}>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-evenly'>
                        <div className='col-md-5'>
                            <div className="mb-3">
                                <label htmlFor="status_ID" className="form-label" style={{ fontSize: '15px' }}>7. Estatus</label>
                                <div className='input-group'>
                                    <span className="ico-estatus"></span>
                                    <select className="form-control" id="status_ID" style={{ borderColor: '#004899' }} disabled={disabledStatus} onChange={handleShowExtras}>
                                        <option value="">Selecciona un estatus</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className="mb-3 mt-3">
                                <label className='m-0 p-1 form-label' style={{ fontSize: '15px' }}>8. Disponible</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" name='disponible' type="checkbox" role="switch" id="available_id" defaultChecked />
                                    <label className="form-check-label" htmlFor="available_id">Disponible</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='contentExtras' style={{ display: 'none' }}>
                        <div className='row justify-content-evenly' id='extrasMB'></div>
                    </div>
                </form>
                <div id='btnSaveProduct' className='col-md-12 text-center mb-4' style={{ display: 'none' }}>
                    <button id='btnSave' onClick={handleShowModalDos} className='btn btn-regresar'>Guardar</button>
                </div>
            </div>
            <AlertTwoBtn
                typeAlert='success'
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleShowModal={handleShowModal}
                TextModalBody={TextModalBody}
                textModalInstructions={textModalInstructions}
                textBtnAccept='Dar de alta'
                textBtnCancel='Regresar a almacén'
                handleAccionBtnAccept={handleAccionBtnAccept}
                handleAccionBtnCancel={handleAccionBtnCancel}
            />

            <AlertTwoBtn
                typeAlert='info'
                showModal={showModalDos}
                handleCloseModal={handleCloseModalDos}
                handleShowModal={handleShowModal}
                TextModalBody='¿Estas seguro de tu acción?'
                textModalInstructions='Si es asi da click en aceptar'
                textBtnAccept='Aceptar'
                textBtnCancel='Regresar'
                handleAccionBtnAccept={handleStoreInventory}
                handleAccionBtnCancel={handleAccionBtnCancel}
            />
        </>
    )
}
