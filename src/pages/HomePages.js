import React, { useContext } from 'react'
import { AuthContext } from '../auth/context'
import { useFetch } from '../hooks/useFetch';


export const HomePages = () => {

  const url = 'https://stg.saiv3api.imagendinamica.mx/api/';
  const { logout, user: userContext } = useContext(AuthContext);

  const logoutOnClick = () => {
    logout();
  }

  const state = useFetch(`${url}apps`);


  const { loading, data } = state;
  console.log(!loading && data);
  console.log(state);

  return (
    <div>
      {
        loading ?
          <small>Cargando...</small>
          :
          (
            <div>
              Bienvenido {userContext?.name}
              <br />
              <button onClick={logoutOnClick} className='btn btn-sm btn-outline-primary mt-4'>Salir</button>
            </div>
          )
      }
    </div>
  )
}
