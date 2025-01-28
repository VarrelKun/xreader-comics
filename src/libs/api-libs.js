import { useState, useEffect } from "react"
import axios from "axios"

const getAnimeResponse = (route) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const FetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://api-xreader.vercel.app/api/${route}`)
                setData(response.data)
            } catch (error) {
                console.error("Error :", error)
                setData([])
            } finally {
                setLoading(false)
            }
        }
        FetchData()
    }, [route])

    return { data, loading }
}

export default getAnimeResponse
