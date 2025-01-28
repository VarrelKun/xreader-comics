import { NavLink } from "react-router-dom"
import getAnimeResponse from "@/libs/api-libs"
import Loading from "@/components/Loading"

const Update = () => {
    // Cek apakah ada data yang sudah disimpan dalam localStorage dan belum expired
    const cachedData = localStorage.getItem('manhwa-new');
    const cachedTime = localStorage.getItem('manhwa-new-time');
    const currentTime = new Date().getTime();
    const cacheExpiryTime = 30 * 60 * 1000; // 30 menit

    let data = null;
    let loading = false;

    // Jika data ada dan tidak expired, gunakan data dari cache
    if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiryTime) {
        data = JSON.parse(cachedData);
    } else {
        // Ambil data dari API jika cache expired atau belum ada cache
        const response = getAnimeResponse("manhwa-new");
        loading = response.loading;
        data = response.data;

        // Simpan data dan waktu terakhir ambil data ke localStorage
        if (data) {
            localStorage.setItem('manhwa-new', JSON.stringify(data));
            localStorage.setItem('manhwa-new-time', currentTime);
        }
    }

    if (loading) {
        return <Loading />
    }
    
    return (
        <div className="p-2">
            <span className="py-2 text-2xl font-extrabold">Komik Terbaru</span>
            <div className="grid grid-cols-3 gap-2 py-2">
                {data.slice(0,21).map((komik, index) => (
                    <NavLink
                        className="relative bg-cover bg-center w-full h-[170px] md:h-[100px] rounded-sm cursor-pointer overflow-hidden"
                        style={{
                            backgroundImage: `url(${komik.imageSrc})`,
                            boxShadow: 'inset 0 -40px 20px rgba(0, 0, 0, 0.8)', // Menambahkan inner shadow dengan opasitas lebih rendah
                            borderRadius: '8px' // Menjaga border-radius tetap
                        }}
                        to={`/komik/${komik.link.split("/")[4]}`}
                        key={index}
                    >
                        <span className="absolute top-0 left-0 bg-my text-black text-xs font-bold rounded-br-xl px-2 py-1">
                            {komik.chapters?.[0]?.chapterTitle 
                                ? `Ch. ${komik.chapters[0].chapterTitle.replace("Ch.", "")}` 
                                : "Ch. Error"}
                        </span>
                        <span className="absolute bottom-0 text-sm font-bold line-clamp-2 p-1">{komik.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Update