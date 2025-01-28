import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"

const Ongoing = () => {
    const { data, loading } = getAnimeResponse("manhwa-ongoing")
    if (loading) {
        return <div></div>
    }

    return (
        <div className="p-2">
            <span className="py-2 text-2xl font-extrabold">Komik Ongoing</span>
            <div className="flex items-center scroll-page gap-2 py-2">
                {data.map((komik, index) => (
                    <NavLink
                        className="relative bg-cover inner-shadow-bottom w-auto min-w-[130px] md:min-w-[250px] h-[170px] md:h-[170px] rounded-lg cursor-pointer overflow-hidden"
                        style={{
                            backgroundImage: `url(${komik.imageUrl.split("?resize")[0]})`,
                            boxShadow: 'inset 0 -40px 20px rgba(0, 0, 0, 0.9)' // Opasitas shadow
                        }}
                        to={`/komik/${komik.link.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute bottom-0 left-0 text-white text-sm font-semibold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Ongoing