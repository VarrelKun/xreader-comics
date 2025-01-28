import { useParams } from "react-router-dom"
import ViewAll from "@/components/ViewAll"

const Genres = () => {
    const { genre } = useParams()
    
    return (
        <div>
            <div className="flex flex-col items-center justify-center p-2">
                <div className="flex text-4xl font-bold">
                    <span className="">X</span>
                    <span className="my">Reader</span>
                </div>
                <span className="text-xs -mt-2">Baca Komik Bahasa Indonesia</span>
            </div>
            <div className="p-2">
                <span className="py-2 text-2xl font-extrabold">Genre : {genre}</span>
                <ViewAll url={`genre/${genre}`} />
            </div>
        </div>
    )
}

export default Genres