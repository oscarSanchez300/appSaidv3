import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const AlertTwoBtn = (
    {
        typeAlert = 'success',
        showModal,
        handleCloseModal,
        handleShowModal,
        TextModalBody, 
        textModalInstructions = '',
        textBtnAccept = 'Aceptar',
        textBtnCancel = 'Cancelar',
        handleAccionBtnAccept,
        handleAccionBtnCancel,
    }
) => {

    let srcAlert = '';
    let srcBucket = 'https://storage.googleapis.com/idsaiv3-staging/mini-icons/';

    if (typeAlert === 'success') {
        srcAlert = srcBucket+'iconok.png';
    } else if (typeAlert === 'info') {
        srcAlert = srcBucket+'iconinfo.png';
    } else if (typeAlert === 'error') {
        srcAlert = srcBucket+'iconerror.png';
    }else{
        srcAlert = srcBucket+'iconok.png';
    }

    return (
        <>
            <Button variant="primary" onClick={handleShowModal} style={{ display: 'none' }}>
                Mostrar el modal
            </Button>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                dialogClassName="modalRedondo"
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <p className='text-center'>
                        <img src={srcAlert} alt='alertModal' />
                    </p>
                    <h5 className='text-body-modal' >{TextModalBody}</h5>
                    <p className='text-center text-modal-info'>{textModalInstructions}</p>
                    <div className='col-md-12' style={{ marginTop: '10%', marginBottom: '20%' }}>
                        <div className='position-relative'>
                            <div className='position-absolute top-0 start-0'>
                                <Button className='btn btn-regresar' variant="secondary" onClick={handleAccionBtnCancel}>
                                    {textBtnCancel}
                                </Button>
                            </div>
                            <div className='position-absolute top-0 end-0'>
                                <Button className='btn btn-regresar' variant="primary" onClick={handleAccionBtnAccept}>
                                    {textBtnAccept}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
