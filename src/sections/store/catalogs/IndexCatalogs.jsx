import { Link } from 'react-router-dom';
import typeCatImg from '../../../img/catalogos/catalogo.png';
import brandCatImg from '../../../img/catalogos/marca.svg';
import statusCatImg from '../../../img/catalogos/estatus.svg';
import spotCatImg from '../../../img/catalogos/spots.svg';
import lineaaImg from '../../../img/almacen/Linea.png';
import baseImg from '../../../img/almacen/base.png';






export const IndexCatalogs = () => {
    return (
        <div className="container">
            <div className="row justify-content-center animate__animated animate__fadeIn">
                <h1 className="text-center mb-0 TitleIndex">Catálogos</h1>
                <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
                <Link to="/store/catalogs/type" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={typeCatImg} alt="Productos" width='30%' height="40px" />
                        <p className='mt-2 Chart-title'>Tipo y extras</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -20 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/subtype" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={typeCatImg} alt="Productos" width='30%' height="40px" />
                        <p className='mt-2  Chart-title'>Subtipo</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -20 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/brand" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={brandCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Marca</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/model" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={brandCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Modelo</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/status" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={statusCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Estatus</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/spot" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Lugar</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/aisle" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Pasillo</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/section" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Sección</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/location" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Ubicación</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/cedis" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Productos" width='30%' />
                        <p className='mt-2  Chart-title'>Destino</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/typeLocation" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Tipo de ubicacion" width='30%' />
                        <p className='mt-2  Chart-title'>Tipo de ubicacion</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -8 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
                <Link to="/store/catalogs/reqOrd" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
                    <div className='card-body text-center'>
                        <img src={spotCatImg} alt="Tipo de ubicacion" width='30%' />
                        <p className='mt-2  Chart-title'>Requerimineto orden de servicio</p>
                        <p className='text-center'>
                            <img src={lineaaImg} alt="Linea" />
                        </p>
                        <p className='text-center'>
                            <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -45 }} width="140" height="8" />
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
