import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../auth/context";

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    const { token } = useContext(AuthContext);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

    useEffect(() => {
        console.log('mounted');
        
        return () => {
            console.log('unmounted');
            isMounted.current = false;
        }
    }, [config])

    useEffect(() => {

        fetch(url, config)
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

    }, [url]);

    return state;

}