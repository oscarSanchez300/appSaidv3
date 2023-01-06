import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/context';

import logoImagen from '../../img/logoESTE.png'


export const Navbar = () => {

    const { logout, user: userContext } = useContext(AuthContext);
    const sampleLocation = useLocation();

    const logoutOnClick = () => {
        logout();
    }

    return (
        <header className="mb-4 shadow-sm" style={{ display: sampleLocation.pathname === '/login' ? 'none' : 'block', height: '100px' }}>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="flex-item">
                            <img src={logoImagen} alt="Imagen Dinámica" className="img-fluid mt-3 animate__animated animate__rubberBand animate__delay-2s" style={{ width: '25%' }} />
                        </div>

                        <div className="flex-item">
                            <h5 className="mb-0">
                                <div className="btn-group mt-4">
                                    <p className='btn btn-sm btn-outline-primary mt-3 shadow' data-bs-toggle="dropdown" aria-expanded="false">
                                        <span> Hola {userContext?.name}</span>
                                    </p>
                                    <ul className="dropdown-menu">
                                        <li><button onClick={logoutOnClick} className="dropdown-item btn btn-sm" >Salir</button></li>
                                    </ul>
                                </div>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}