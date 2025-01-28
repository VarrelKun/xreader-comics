import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"
import { FaStar } from "react-icons/fa6"
import LoadingMini from "@/components/LoadingMini"

const Viewed = () => {
    // Cek apakah ada data yang sudah disimpan dalam localStorage dan belum expired
    const cachedData = localStorage.getItem('manhwa-recommendation');
    const cachedTime = localStorage.getItem('manhwa-recommendation-time');
    const currentTime = new Date().getTime();
    const cacheExpiryTime = 2 * 60 * 1000; // 2 menit

    let data = null;
    let loading = false;

    // Jika data ada dan tidak expired, gunakan data dari cache
    if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiryTime) {
        data = JSON.parse(cachedData);
    } else {
        // Ambil data dari API jika cache expired atau belum ada cache
        const response = getAnimeResponse("manhwa-recommendation");
        loading = response.loading;
        data = response.data;

        // Simpan data dan waktu terakhir ambil data ke localStorage
        if (data) {
            localStorage.setItem('manhwa-recommendation', JSON.stringify(data));
            localStorage.setItem('manhwa-recommendation-time', currentTime);
        }
    }

    if (loading) {
        return <LoadingMini />
    }

    return (
        <div className="p-2">
            <span className="py-2 text-2xl font-extrabold">Komik Rekomendasi</span>
            <div className="flex items-center scroll-page gap-2 py-2">
                {data.map((komik, index) => (
                    <NavLink
                        className="relative bg-cover inner-shadow-bottom w-auto min-w-[107px] md:min-w-36 h-36 md:h-48 rounded-lg cursor-pointer overflow-hidden"
                        style={{backgroundImage: `url(${komik.imageSrc.split("?resize")[0]})`}}
                        to={`/komik/${komik.link.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-my text-black text-xs font-bold rounded-br-xl px-2 py-1">Ch. {komik.chapter.replace("Chapter","")}</span>
                        <div className="absolute top-[76px] left-0 flex items-center gap-1 p-1">
                            <FaStar className="text-yellow-300 text-xs z-50" />
                            <span className="text-white text-xs font-medium z-50">{komik.rating.slice(0,3)}</span>
                        </div>
                        <span className="absolute bottom-0 text-white text-sm font-semibold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Viewed
