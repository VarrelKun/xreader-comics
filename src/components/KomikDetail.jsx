import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import getAnimeResponse from "@/libs/api-libs";
import { FaPaperPlane, FaUser, FaBookmark, FaTrash, FaArrowLeft, FaStar, FaCalendarDays, FaPaintbrush, FaReadme, FaRegCommentDots } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import Loading from "@/components/Loading";

const KomikDetail = () => {
  const [isBookmark, setIsBookmark] = useState(false);
  const navigate = useNavigate();
  const { komik } = useParams();
  const { data, loading } = getAnimeResponse(`manhwa-detail/${komik}`);
  const commentBoxRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const loadCommentBox = async () => {
      try {
        if (!scriptRef.current) {
          scriptRef.current = document.createElement("script");
          scriptRef.current.src = "https://unpkg.com/commentbox.io/dist/commentBox.min.js";
          scriptRef.current.async = true;
          scriptRef.current.onerror = () => {
            console.error("Failed to load CommentBox script");
          };
          document.body.appendChild(scriptRef.current);

          await new Promise((resolve, reject) => {
            scriptRef.current.onload = resolve;
            scriptRef.current.onerror = reject;
          });
        }

        if (window.commentBox) {
          commentBoxRef.current = window.commentBox('5660104556806144-proj', {
            className: 'commentbox',
            defaultBoxId: `${komik}`,
            textColor: 'white',
          });
        }
      } catch (error) {
        console.error("Error initializing CommentBox:", error);
      }
    };

    loadCommentBox();

    if (data) {
      const checkBookmark = JSON.parse(localStorage.getItem("bookmarkKomik")) || [];
      const isBookmarked = checkBookmark.some((komik) => komik.title === data.title);
      setIsBookmark(isBookmarked);
    }

    return () => {
      if (commentBoxRef.current) {
        try {
          commentBoxRef.current.destroy();
          commentBoxRef.current = null;
        } catch (error) {
          console.error("Error destroying CommentBox:", error);
        }
      }
    };
  }, [komik, data]);

  if (loading) {
    return <Loading />;
  }

  const genre = data?.genres.map(genre => genre.genreName).join(", ");
  const angka = parseInt(data?.followedBy.match(/\d+/)?.[0] || 0);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleBookmark = () => {
    const bookmarkKomik = JSON.parse(localStorage.getItem("bookmarkKomik")) || [];
    if (isBookmark) {
      const removeBookmark = bookmarkKomik.filter(komik => komik.title !== data.title);
      localStorage.setItem("bookmarkKomik", JSON.stringify(removeBookmark));
      setIsBookmark(false);
    } else {
      const updatedData = { ...data, link: komik };
      bookmarkKomik.push(updatedData);
      localStorage.setItem("bookmarkKomik", JSON.stringify(bookmarkKomik));
      setIsBookmark(true);
    }
  };

  const shareUrl = () => {
    const shareData = {
      title: "Bagikan Komik Ini",
      text: `Ayo ajak temanmu untuk baca komik ini : ${window.location.href}`,
    };

    if (navigator.share) {
      try {
        navigator.share(shareData);
        console.log("Berhasil dibagikan!");
      } catch (error) {
        console.error("Gagal membagikan:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center gap-3 px-2 pt-10 pb-2">
        <img className="absolute top-0 w-screen h-52 blur-2xl" src={data.imageSrc} />
        <button className="absolute top-2 left-3" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="w-1/3">
          <img className="relative bg-cover bg-center w-full h-50 rounded-lg overflow-hidden" src={data.imageSrc} alt="" />
        </div>
        <span className="relative text-3xl font-extrabold">{data.title.replace("Bahasa Indonesia", "")}</span>
      </div>
      <div className="flex items-center gap-1 pl-3 pb-3">
        <IoMdEye className="text-sm" />
        <span className="text-xs">{data.followedBy.replace("Diikuti", "Dibaca")}</span>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap scroll-page px-2 py-1">
        <div className="flex items-center gap-1 text-sm bg-[#212121] px-3 py-1 rounded-full">
          <FaCalendarDays className="text-sm text-white" />
          <span>{data.released}</span>
        </div>
        <div className="flex items-center gap-1 text-sm bg-[#212121] px-3 py-1 rounded-full">
          <FaUser className="text-sm text-white" />
          <span>{data.author}</span>
        </div>
        <div className="flex items-center gap-1 text-sm bg-[#212121] px-3 py-1 rounded-full">
          <FaPaintbrush className="text-sm text-white" />
          <span>{data.artist}</span>
        </div>
        <div className="flex items-center gap-1 text-sm bg-[#212121] px-3 py-1 rounded-full">
          <FaStar className="text-sm text-yellow-300" />
          <span>{data.rating}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap scroll-page px-2 py-1">
        {data.genres.map((genre, index) => (
          <div className="text-sm bg-[#212121] px-3.5 py-1 rounded-full" key={index}>
            {genre.genreName}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 px-7 py-10">
        {isBookmark ?
          <button
            className="flex items-center gap-5 bg-[#212121] hover:bg-[#171717] w-1/2 text-white p-3 rounded-full"
            onClick={handleBookmark}
          >
            <FaTrash className="text-xl text-red-600" />
            <span className="text-lg text-white font-semibold">Remove</span>
          </button>
          :
          <button
            className="flex items-center gap-5 bg-[#212121] hover:bg-[#171717] w-1/2 text-white p-3 rounded-full"
            onClick={handleBookmark}
          >
            <FaBookmark className="text-xl my" />
            <span className="text-lg text-white font-semibold">Bookmark</span>
          </button>
        }
        <button
          onClick={shareUrl}
          className="flex items-center gap-5 bg-[#212121] hover:bg-[#171717] w-1/2 text-white px-3 py-3 rounded-full"
        >
          <FaPaperPlane className="text-xl my" />
          <span className="text-lg font-semibold">Bagikan</span>
        </button>
      </div>
      <p className="text-sm px-3">{data.synopsis}</p>

      {/* Chapter List */}
      <div className="p-2">
        <span className="py-2 text-2xl font-extrabold">Chapter List :</span>
      </div>
      <div className="container max-h-[250px] flex flex-col overflow-y-auto gap-1 rounded-md p-2">
        {data.chapters.map((chapter, index) => {
          const randomNumber = getRandomNumber(1, angka);
          return (
            <div className="mt-1" key={index}>
              <div className="flex items-center gap-1 pb-1 pl-1">
                <IoMdEye className="text-sm" />
                <span className="text-xs">{randomNumber}</span>
              </div>
              <NavLink
                className="flex items-center justify-between bg-[#212121] px-4 py-3 rounded-bl-3xl rounded-tr-3xl"
                to={`/chapter/${chapter.chapterLink.split("/")[3]}`}
              >
                <div className="flex flex-col">
                  <span className="font-bold">{chapter.chapterNum}</span>
                  <span className="text-sm">{chapter.chapterDate}</span>
                </div>
                <FaReadme className="text-1xl" />
              </NavLink>
            </div>
          );
        })}
      </div>

      {/* Comments Section moved below Chapter List */}
      <div className="p-4 mt-6 bg-[#212121] rounded-lg mx-3 max-h-[600px] overflow-y-auto">

        <div className="commentbox" />
      </div>
    </div>
  );
};

export default KomikDetail;
