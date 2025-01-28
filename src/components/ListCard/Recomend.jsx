import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"
import Loading from "@/components/Loading"

const Recomend = () => {
    const { data, loading } = getAnimeResponse("manhwa-top")
    if (loading) {
        return <div></div>
    }
    
    return (
        <div className="flex items-center scroll-page snap-x snap-mandatory pt-4 pb-2 overflow-x-auto">
            {data.map((komik,index) => (
                <NavLink
                    className="relative flex shrink-0 snap-center w-full h-36 md:h-48 bg-black bg-cover bg-center text-white"
                    style={{backgroundImage: `url(${komik.image.split("?resize")[0]})`}}
                    to={`/komik/${komik.url.split("/")[4]}`}
                    key={index}
                >
                    <div className="absolute inset-0 bg-black opacity-85 brightness-75"></div>
                    <div className="flex flex-col items-start justify-center gap-y-2 w-2/3 md:3/4 p-4 z-10">
                        <div className="relative -top-4 w-full">
                            <span className="text-xl font-bold line-clamp-2">{komik.title}</span>
                            <span className="text-xs line-clamp-2">
                                {komik.genres
                                .map((genre) => genre.replace("Genre:", "").trim())
                                .join(", ")}
                            </span>
                        </div>
                        <button className="absolute bottom-2 bg-my text-black text-sm font-semibold px-2 py-1 rounded-md">
                            Baca Sekarang
                        </button >
                    </div>
                    <div className="w-1/3 md:1/4 z-10">
                        <img className="w-full h-full" src={komik.image.split("?resize")[0]} alt="" />
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Recomend