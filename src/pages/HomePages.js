import React, { useContext } from 'react'
import { AuthContext } from '../auth/context'

export const HomePages = () => {

  const { logout, user: userContext } = useContext(AuthContext);

  const logoutOnClick = () => {
    logout();
  }


  return (
    <div>
      Bienvenido {userContext?.name}
      <br />
      <br />
      <button onClick={logoutOnClick}>Salir</button>
    </div>
  )
}
