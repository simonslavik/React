import React, {useEffect, useRef} from 'react';
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';



function Home({username}) {

    const WS_URL = 'ws://localhost:8000'
    const {sendJsonMessage} = useWebSocket(WS_URL, {
        queryParams: {
            username
        }
    })

    const THROTTLE = 50

    const sendJsonMessageThrottled = throttle(sendJsonMessage, THROTTLE)


    useEffect(() => {
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottled.current({
                type: 'mousemove',
                x: e.clientX,
                y: e.clientY
            })
        })
    }, [])

    return (
        <h1>
            This is the Home component, {username}!
        </h1>
    )
}

export default Home;