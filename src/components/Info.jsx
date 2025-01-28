import { FaFacebook,FaInstagram,FaTelegram } from "react-icons/fa"

const Info = () => {
    return (
        <div className="p-2">
            <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold">Information</span>
            </div>
            <div className="flex flex-col px-2 pt-6">
                <span className="">Selamat datang di X-Reader. Website baca komik online yang berisi berbagai koleksi manhua, manhwa, dan manga dengan terjemahan Bahasa Indonesia berkualitas. Nikmati pengalaman membaca komik favorit kamu dengan fitur yang mudah digunakan dan tampilan yang nyaman di semua perangkat.</span>
                <span className="text-lg font-semibold pt-4">Kontak Saya</span>
                <a className="flex items-center gap-1" href="https://www.facebook.com/gopala5u">
                    <FaFacebook className="" />
                    <span className="">https://www.facebook.com/gopala5u</span>
                </a>
                <a className="flex items-center gap-1" href="https://www.instagram.com/gopalasu_">
                    <FaInstagram className="" />
                    <span className="">https://www.instagram.com/gopalasu_</span>
                </a>
            </div>
        </div>
    )
}

export default Info