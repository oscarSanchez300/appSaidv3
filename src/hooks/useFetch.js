import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../auth/context";

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    const { token } = useContext(AuthContext);
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + token
    //     },
    // };

    useEffect(() => {
        console.log('mounted useFetch');

        return () => {
            console.log('unmounted useFetch');
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(resp => resp.json())
            .then(data => {

                if (isMounted.current) {

                    setState({
                        loading: false,
                        data: data,
                        error: null
                    })

                }

            }).catch(reject => {

                setState({
                    loading: false,
                    data: null,
                    error: reject.response,
                })

            })

    }, [url, token]);

    return state;

}