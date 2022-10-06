import { NavLink, useLocation } from 'react-router-dom';


export const Navbar = () => {

    const sampleLocation = useLocation();

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ display: sampleLocation.pathname === '/login' ? 'none' : 'block' }}>

            {/* <Link
                className="navbar-brand"
                to="/"
            >
                Home
            </Link> */}

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className="nav-item nav-link"
                        to="/home"
                    >
                        Home
                    </NavLink>

                    {/* <NavLink
                        className="nav-item nav-link"
                        to="/login"
                    >
                        Login
                    </NavLink> */}
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    {/* <NavLink
                        className="nav-item nav-link"
                        to="/login"
                    >
                        Salir
                    </NavLink> */}
                </ul>
            </div>
        </nav>
    )
}