import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import getAnimeResponse from "@/libs/api-libs";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "@/components/Loading";

const ChapterDetail = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [dataDetail, setDataDetail] = useState(null);
    const { chapter } = useParams();
    const navigate = useNavigate();
    const chapterContainerRef = useRef(null);

    useEffect(() => {
        if (!dataDetail) return;
        const timeNow = new Date().toISOString();
        const history = JSON.parse(localStorage.getItem("historyKomik")) || [];
        const existingIndex = history.findIndex((item) => item.title === dataDetail.title);

        const updatedHistory = {
            title: dataDetail.title,
            link: chapter,
            imageSrc: dataDetail.imageSrc,
            rating: dataDetail.rating,
            date: timeNow,
        };

        if (existingIndex !== -1) {
            history[existingIndex] = updatedHistory;
        } else {
            history.push(updatedHistory);
        }

        localStorage.setItem("historyKomik", JSON.stringify(history));
    }, [dataDetail, chapter]);

    useEffect(() => {
        const FetchDetail = async () => {
            setLoadingDetail(true);
            try {
                const response = await axios.get(
                    `https://api-xreader.vercel.app/api/manhwa-detail/${chapter.split("-chapter")[0]}`
                );
                console.log(response.data);
                setDataDetail(response.data);
            } catch (error) {
                console.error("Error :", error);
                setDataDetail([]);
            } finally {
                setLoadingDetail(false);
            }
        };
        FetchDetail();
    }, [chapter]);

    const { data, loading } = getAnimeResponse(`chapter/${chapter}`);
    if (loading) {
        return <Loading />;
    }

    if (loadingDetail) {
        return <div></div>;
    }

    // Fungsi untuk menangani scroll saat area kanan layar diklik
    const handleImageClick = (event) => {
    const containerRect = chapterContainerRef.current.getBoundingClientRect();
    const clickPosition = event.clientX;
    const rightBoundary = containerRect.right * 0.85; // Hanya 85% sisi kanan yang bisa di-scroll

    if (clickPosition > rightBoundary) {
        // Klik di area kanan yang diizinkan
        window.scrollTo({
            top: window.scrollY + window.innerHeight,
            behavior: "smooth",
        });
    } else {
        // Klik di area lainnya (misalnya di kiri atau di tengah)
        setShowNavbar(!showNavbar);
    }
};

    return (
        <div ref={chapterContainerRef}>
            <div className="flex flex-col items-center">
                {data.images.map((image, index) => (
                    <img
                        className="w-full h-auto"
                        src={image}
                        key={index}
                        onClick={handleImageClick}
                    />
                ))}
            </div>

            <div>
                <div
                    className={`fixed top-0 flex items-center justify-center bg-[#111111] w-full rounded-b-lg animated-topbar ${
                        showNavbar ? "show" : "hide"
                    }`}
                >
                    <button className="absolute left-4" onClick={() => navigate(-1)}>
                        <FaArrowLeft className="text-xl" />
                    </button>
                    <span className="font-extrabold p-2">Mode Baca</span>
                </div>
                <div
                    className={`fixed bottom-0 transition-all bg-[#111111] w-full h-38 rounded-t-2xl animated-navbar ${
                        showNavbar ? "show" : "hide"
                    }`}
                >
                    <div className="flex items-center gap-2 p-4">
                        <NavLink className="w-1/4" to={`/komik/${chapter.split("-chapter")[0]}`}>
                            <img
                                className="w-full h-full border-2 rounded-lg"
                                src={dataDetail.imageSrc}
                                alt=""
                            />
                        </NavLink>
                        <div className="flex flex-col justify-center w-3/4">
                            <span className="font-extrabold line-clamp-2">
                                {dataDetail.title.replace("Bahasa Indonesia", "")}
                            </span>
                            <span className="text-xs">Chapter {data.title.split("Chapter ")[1]}</span>
                            <div className="flex items-center justify-center gap-2 py-2">
                                {data.prevChapter ? (
                                    <NavLink
                                        className="flex items-center bg-[#212121] hover:bg-[#171717] px-4 py-2 rounded-full"
                                        to={`/chapter/${data.prevChapter?.split("/")[3]}`}
                                    >
                                        <span className="text-sm font-semibold">Sebelumnya</span>
                                    </NavLink>
                                ) : null}
                                {data.nextChapter ? (
                                    <NavLink
                                        className="flex items-center bg-[#212121] hover:bg-[#171717] px-4 py-2 rounded-full"
                                        to={`/chapter/${data.nextChapter.split("/")[3]}`}
                                    >
                                        <span className="text-sm font-semibold">Selanjutnya</span>
                                    </NavLink>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChapterDetail;