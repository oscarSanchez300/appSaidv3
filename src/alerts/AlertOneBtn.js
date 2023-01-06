import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const AlertTwoBtn = (
    {
        typeAlert = 'success',
        showModal,
        handleCloseModal,
        handleShowModal,
        TextModalBody = '',
        textModalInstructions = '',
        textBtnAccept = 'Aceptar',
        handleAccionBtnAccept,
    }
) => {

    let srcAlert = '';
    let srcBucket = 'https://storage.googleapis.com/idsaiv3-staging/mini-icons/';

    if (typeAlert === 'success') {
        srcAlert = srcBucket + 'iconok.png';
    } else if (typeAlert === 'info') {
        srcAlert = srcBucket + 'iconinfo.png';
    } else if (typeAlert === 'error') {
        srcAlert = srcBucket + 'iconerror.png';
    } else {
        srcAlert = srcBucket + 'iconok.png';
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
                className='animate__animated animate__bounceIn'
            >
                <Modal.Body>
                    <p className='text-center'>
                        <img src={srcAlert} alt='alertModal' />
                    </p>
                    <h5 className='text-body-modal' >{TextModalBody}</h5>
                    <p className='text-center text-modal-info'>{textModalInstructions}</p>
                    <div className='col-md-12 text-center' style={{ marginTop: '10%' }}>
                        <Button className='btn btn-regresar' variant="primary" onClick={handleAccionBtnAccept}>
                            {textBtnAccept}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
