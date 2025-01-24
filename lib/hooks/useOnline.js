'use client'

import { useState, useEffect } from 'react'


export default function useOnline () {
    const [online, setOnline] = useState(undefined)

    function offlineHandler () {
        setOnline(false)
    }

    function onlineHandler () {
        setOnline(true)
    }

    useEffect(()=>{
        setOnline(navigator.onLine)
    },[]);

    useEffect (() => {
        setOnline(navigator.onLine)
        window.addEventListener('online', onlineHandler)
        window.addEventListener('offline', offlineHandler)

        return () => {
            window.removeEventListener('online', onlineHandler)
            window.removeEventListener('offline', offlineHandler)
        }
    }, [])

    return online
}

