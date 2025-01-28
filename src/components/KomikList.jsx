import Recomend from "@/components/ListCard/Recomend"
import Update from "@/components/ListCard/Update"
import Ongoing from "@/components/ListCard/Ongoing"
import GenreList from "@/components/ListCard/GenreList"
import Populer from "@/components/ListCard/Populer"
import Viewed from "@/components/ListCard/Viewed"

const KomikList = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center p-2">
                <div className="flex text-4xl font-bold">
                    <span className="">X</span>
                    <span className="my">Reader</span>
                </div>
                <span className="text-xs -mt-2">Baca Komik Bahasa Indonesia</span>
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