import { NavLink } from "react-router-dom"
import { FaHome,FaSearch,FaHistory } from "react-icons/fa"
import { FaBookmark,FaCircleInfo } from "react-icons/fa6"

const BottomNavbar = ({ route }) => {
    const getActive = (now) => (now === route.pathname ? "active" : "")

    return (
        <div className="fixed bottom-0 w-full h-14 z-50 bg-[#111111]/50 backdrop-blur-md rounded-t-xl flex items-center justify-around">
            <div className="container flex justify-center gap-7 m-3">
                <NavLink to="/" className={`nav-links relative flex items-center justify-center grow p-2.5 ${getActive("/")}`}>
                    <FaHome className="text-xl" />
                </NavLink>
                <NavLink to="/search" className={`nav-links relative flex items-center justify-center grow p-2.5 ${getActive("/search")}`}>
                    <FaSearch className="text-xl" />
                </NavLink>
                <NavLink to="/bookmark" className={`nav-links relative flex items-center justify-center grow p-2.5 ${getActive("/bookmark")}`}>
                    <FaBookmark className="text-xl" />
                </NavLink>
                <NavLink to="/history" className={`nav-links relative flex items-center justify-center grow p-2.5 ${getActive("/history")}`}>
                    <FaHistory className="text-xl" />
                </NavLink>
                <NavLink to="/info" className={`nav-links relative flex items-center justify-center grow p-2.5 ${getActive("/setting")}`}>
                    <FaCircleInfo className="text-xl" />
                </NavLink>
            </div>
        </div>
    )
}

export default BottomNavbar
