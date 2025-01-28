import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"
import { FaStar } from "react-icons/fa6"

const Populer = () => {
    // Cek apakah ada data yang sudah disimpan dalam localStorage dan belum expired
    const cachedData = localStorage.getItem('manhwa-popular');
    const cachedTime = localStorage.getItem('manhwa-popular-time');
    const currentTime = new Date().getTime();
    const cacheExpiryTime = 2 * 60 * 1000; // 2 menit

    let data = null;
    let loading = false;

    // Jika data ada dan tidak expired, gunakan data dari cache
    if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiryTime) {
        data = JSON.parse(cachedData);
    } else {
        // Ambil data dari API jika cache expired atau belum ada cache
        const response = getAnimeResponse("manhwa-popular");
        loading = response.loading;
        data = response.data;

        // Simpan data dan waktu terakhir ambil data ke localStorage
        if (data) {
            localStorage.setItem('manhwa-popular', JSON.stringify(data));
            localStorage.setItem('manhwa-popular-time', currentTime);
        }
    }

    if (loading) {
        return <div></div>
    }

    return (
        <div className="p-2">
            <span className="py-2 text-2xl font-extrabold">Komik Populer</span>
            <div className="flex items-center scroll-page gap-2 py-2">
                {data.map((komik, index) => (
                    <NavLink
                        className="relative bg-cover inner-shadow-bottom w-auto min-w-[100px] md:min-w-[144px] h-[144px] md:h-[192px] rounded-lg cursor-pointer overflow-hidden"
                        style={{
                            backgroundImage: `url(${komik.imageSrc.split("?resize")[0]})`,
                            boxShadow: 'inset 0 -40px 20px rgba(0, 0, 0, 0.9)'
                        }}
                        to={`/komik/${komik.link.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-my text-black text-xs font-bold rounded-br-xl px-2 py-1">Ch. {komik.chapter.replace("Chapter", "")}</span>
                        <div className="absolute bottom-0 left-0 p-1">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-300 text-xs z-50" />
                                    <span className="text-white text-xs font-medium z-50">{komik.rating.slice(0, 3)}</span>
                                </div>
                                <span className="text-white text-sm font-semibold line-clamp-2">{komik.title}</span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Populer
