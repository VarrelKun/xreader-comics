import gif from "@/assets/loader.gif"

const LoadingMini = () => {
    return (
        <div className="flex items-center justify-center p-2">
            <div className="flex flex-col items-center justify-center">
                <img className="w-32" src={gif} alt="Sabar Nyett" />
                <h1 className="font-medium">Sabar nyett....</h1>
            </div>
        </div>
    )
}

export default LoadingMini