import Recomend from "@/components/ListCard/Recomend"
import Update from "@/components/ListCard/Update"
import Ongoing from "@/components/ListCard/Ongoing"
import GenreList from "@/components/ListCard/GenreList"
import Populer from "@/components/ListCard/Populer"
import Viewed from "@/components/ListCard/Viewed"
import mY from "@/assets/20250128_230226.png"

const KomikList = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center p-2">
                <div className="flex">
                    <img src={mY} alt="Eclipse" className="w-40 h-auto" />
                </div>
                <span className="text-xs -mt-0">Baca Komik Bahasa Indonesia</span>
            </div>
            <Recomend />
            <Update />
            <Ongoing />
            <GenreList />
            <Populer />
            <Viewed />
        </div>
    )
}

export default KomikList
