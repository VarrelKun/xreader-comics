import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FaStar } from "react-icons/fa6"

const History = () => {
    const [dataHistory, setDataHistory] = useState([])

    useEffect(() => {
        const historyData = localStorage.getItem('historyKomik')
        if (historyData) {
          const komik = JSON.parse(historyData)
          const sortKomik = komik.sort((a, b) => new Date(b.date) - new Date(a.date))
          setDataHistory(sortKomik)
        }
    }, [])
    
    const convertTime = (time) => {
        const now = new Date()
        const chapterTime = new Date(time)
        const difference = now - chapterTime
    
        const seconds = Math.floor(difference / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
    
        if (seconds < 60) {
            return `${seconds} detik yang lalu`
        } else if (minutes < 60) {
            return `${minutes} menit yang lalu`
        } else if (hours < 24) {
            return `${hours} jam yang lalu`
        } else {
            return `${days} hari yang lalu`
        }
    }


    return (
        <div className="p-2">
            <div className="flex items-center justify-center">
                <span className="text-2xl font-extrabold">History</span>
            </div>
                <div className="grid grid-cols-3 gap-2 py-10">
                {dataHistory.reverse().map((komik,index) => (
                <div className="flex flex-col" key={index}>
                     <NavLink
    className="relative bg-cover bg-center w-full h-[170px] md:h-[100px] cursor-pointer overflow-hidden"
    style={{
      backgroundImage: `url(${komik.imageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 -40px 20px rgba(0, 0, 0, 0.8)', // Mengurangi opasitas shadow
      borderRadius: '8px' // Menjaga border-radius tetap
    }}
    to={`/chapter/${komik.link}`}
  >
                        <span className="absolute top-0 left-0 bg-my text-black text-xs font-bold rounded-br-xl px-2 py-1">Ch. {komik.link.split("chapter-")[1]}</span>
                        <div className="absolute top-[107px] left-0 flex items-center gap-1 p-1">
                            <FaStar className="text-yellow-300 text-xs z-50" />
                            <span className="text-white text-xs font-medium z-50">{komik.rating.slice(0,3)}</span>
                        </div>
                        <span className="absolute bottom-0 text-white text-sm font-semibold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                    <span className="text-xs font-bold p-1">{convertTime(komik.date)}</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default History