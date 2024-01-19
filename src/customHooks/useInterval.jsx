import { useEffect, useRef } from "react"



export default function useInterval(callback, delay) {

    const savedCallback= useRef();

    useEffect(() => {
        savedCallback.current= callback;
    }, [callback])

    useEffect(() => {
        function fire() {
            savedCallback.current();
        }

        if(delay !== null) {
            const id= setInterval(fire, delay);
            return () => clearInterval(id);
        }
    }, [delay])
}