import { Link } from "react-router-dom";
import lineaaImg from '../../../img/almacen/Linea.png';
import baseImg from '../../../img/almacen/base.png';
import imgImport from '../../../img/carga.svg';


export const Index = () => {
  return (
    <div className="container">
      <div className="row justify-content-center animate__animated animate__fadeIn">
        <h1 className="text-center mb-0 TitleIndex">Operaciones Masiva</h1>
        <p className='text-center m-0 p-0 mb-4'>Da click donde quieres acceder</p>
        <Link to="/store/masssiveImport/product" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
          <div className='card-body text-center'>
            <img src={imgImport} alt="Productos" width='30%' height="60px" />
            <p className='mt-2 Chart-title mb-0'>Carga de producto</p>
            <p className='text-center'>
              <img src={lineaaImg} alt="Linea" />
            </p>
            <p className='text-center'>
              <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -30 }} width="140" height="8" />
            </p>
          </div>
        </Link>
        <Link to="/store/masssiveImport/entry" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
          <div className='card-body text-center'>
            <img src={imgImport} alt="Productos" width='30%' height="60px" />
            <p className='mt-2 Chart-title mb-0'>Carga de entradas</p>
            <p className='text-center'>
              <img src={lineaaImg} alt="Linea" />
            </p>
            <p className='text-center'>
              <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -30 }} width="140" height="8" />
            </p>
          </div>
        </Link>
        <Link to="/store/masssiveImport/productEntry" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
          <div className='card-body text-center'>
            <img src={imgImport} alt="Productos" width='30%' height="60px" />
            <p className='mt-2 Chart-title mb-0'>Carga de productos y entradas</p>
            <p className='text-center'>
              <img src={lineaaImg} alt="Linea" />
            </p>
            <p className='text-center'>
              <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -65 }} width="140" height="8" />
            </p>
          </div>
        </Link>
        <Link to="/store/masssiveImport/departures" className='card mt-4 mb-2 shadow Rectangle-Copy-15'>
          <div className='card-body text-center'>
            <img src={imgImport} alt="Productos" width='30%' height="60px" />
            <p className='mt-2 Chart-title mb-0'>Carga de salidas</p>
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
