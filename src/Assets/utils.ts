import { useEffect } from "react"

export const useLogger = (...args: any) => {
    useEffect(() => console.log(...args))
}

// export const baseurl = "http://localhost:8080"
export const baseurl = "https://possibillion-sample-prj-server.herokuapp.com"