
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import lineaaImg from '../img/almacen/Linea.png';
import baseImg from '../img/almacen/base.png';



export const HomePages = () => {

  const url = process.env.REACT_APP_API_URL;
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
            <div className='container'>
              <h1 className='text-center TitleIndex'>Da click donde quieres acceder</h1>
              <div className='row justify-content-center mt-4'>
                {
                  data.idapps.map(appR => (
                    appR.idapp_active ?
                      (
                        <Link to={'/' + appR.URL} className='card mt-4 mb-2 shadow Rectangle-Copy-15' key={appR.id}>
                          <div className='card-body text-center'>
                            <img src={appR.thumbnail} alt={appR.id_apps_desc} width='30%' height="50px" />
                            <p className='mt-2 Chart-title'>{appR.id_apps_desc}</p>
                            <p className='text-center'>
                              <img src={lineaaImg} alt="Linea" />
                            </p>
                            <p className='text-center'>
                              <img className='Rectangle-Copy-167' src={baseImg} alt="Base" style={{ marginTop: -40 }} width="140" height="8" />
                            </p>
                          </div>
                        </Link>
                      )
                      : ''
                  ))
                }
              </div>
            </div>
          )
      }
    </div >
  )
}
