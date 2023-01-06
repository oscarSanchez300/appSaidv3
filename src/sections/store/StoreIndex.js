import { Link } from "react-router-dom";
import lineaaImg from '../../img/almacen/Linea.png';
import baseImg from '../../img/almacen/base.png';


export const StoreIndex = () => {

    return (
        <div className="container">
            <div className="row justify-content-center animate__animated animate__fadeIn">
                <h1 className="text-center mb-0 TitleIndex">Almacén</h1>
                <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
                <Link to="/store/products" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src="https://storage.googleapis.com/idsaiv3-staging/icons/warehouse/module_alta_de_inventario.png" alt="Productos" width='30%' height="60px" />
                        <p className='mt-2 Chart-title mb-0'>Productos</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -30 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src="https://storage.googleapis.com/idsaiv3-staging/mini-icons/evidences/evidence_grupo.png" alt="Productos" width='30%' height="60px" />
                        <p className='mt-2 Chart-title mb-0'>Catálogos</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -30 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
