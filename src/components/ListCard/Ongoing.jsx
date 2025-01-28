import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"

const Ongoing = () => {
    // Cek apakah ada data yang sudah disimpan dalam localStorage dan belum expired
    const cachedData = localStorage.getItem('manhwa-ongoing');
    const cachedTime = localStorage.getItem('manhwa-ongoing-time');
    const currentTime = new Date().getTime();
    const cacheExpiryTime = 30 * 60 * 1000; // 30 menit

    let data = null;
    let loading = false;

    // Jika data ada dan tidak expired, gunakan data dari cache
    if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiryTime) {
        data = JSON.parse(cachedData);
    } else {
        // Ambil data dari API jika cache expired atau belum ada cache
        const response = getAnimeResponse("manhwa-ongoing");
        loading = response.loading;
        data = response.data;

        // Simpan data dan waktu terakhir ambil data ke localStorage
        if (data) {
            localStorage.setItem('manhwa-ongoing', JSON.stringify(data));
            localStorage.setItem('manhwa-ongoing-time', currentTime);
        }
    }

    if (loading) {
        return <div></div> // Tidak menampilkan loading jika data dari cache
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