import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { FaArrowLeft, FaRegCalendar, FaRegBookmark, FaRegTrashCan, FaChevronRight } from "react-icons/fa"; // Import icons as needed
import { Spinner } from "../ui/Spinner";
import { NavLinkTour } from "../ui/NavLinkTour";
import { WrongPage } from "./WrongPage";

export const SpecificTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tour/getById/${id}`); // Adjust the endpoint URL according to your backend setup
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchTourById();
    }
  }, [id]);

  if (loading) {
    return (
        <main className="relative pt-32 px-[8%]">
          <Spinner />
        </main>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tour) {
    return <WrongPage />;
  }

  return (
      <main className="relative pt-32">
        {/* Render the tour details using the fetched data */}
        {/* Use the tour object properties to populate the UI */}
        <div className="flex text-[--secundary-color] gap-5 px-[8%] flex-col laptop:flex-row justify-between">
        <span className="gap-2">
          Tours <FaChevronRight className="scale-[0.7] inline-block" />{" "}
          <span className="text-white">{tour.title}</span>
        </span>
          <Link
              to="/tours"
              className="border-b border-white/40 transition duration-200 hover:text-white flex items-center gap-2
          w-fit cursor-pointer"
          >
            <FaArrowLeft />
            Get back
          </Link>
        </div>
      <div className="grid grid-cols-1 full:grid-cols-2 gap-16 mt-16 px-[8%]">
        <div
          className={`bg-contain bg-no-repeat relative`}
          style={{
            backgroundImage: (''),
            paddingBottom: "100%",
          }}
        >
          {/*<motion.img*/}
          {/*  initial={{ opacity: 0 }}*/}
          {/*  animate={{ opacity: 1 }}*/}
          {/*  transition={{ duration: 1.5 }}*/}
          {/*  src={currentTour.tourImage}*/}
          {/*  alt={currentTour.name}*/}
          {/*  className="bg-cover w-full absolute inset-0"*/}
          {/*/>*/}
        </div>
        <div className="text-white flex flex-col items-start gap-6 justify-start border-white/30">
          <div className="flex flex-col items-start gap-6">

            {/*<h1 className="text-3xl tablet:text-4xl font-semibold">*/}
            {/*  {currentTour.title}*/}
            {/*</h1>*/}
            <div className="flex items-center gap-3">
              {/*<StarRating rating={currentTour.avgreview} />*/}
              {/*<span className="text-white/60 text-base mb-1 font-light">*/}
              {/*  {!currentTour.avgreview*/}
              {/*    ? "( No reviews yet )"*/}
              {/*    : `( ${currentTour.totalreviews} reviews )`}*/}
              {/*</span>*/}
            </div>
            <div className="flex items-start justify-start gap-5 tablet:gap-10 border-y border-white/20 w-full py-6">
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light whitespace-nowrap">Duration</h2>
                {/*<h2 className="font-semibold text-lg">*/}
                {/*  {currentTour.duration} days*/}
                {/*</h2>*/}
              </div>
              <div className="flex flex-col gap-2 items-center tablet:items-start text-center ">
                <h2 className="font-light whitespace-nowrap">Group Size</h2>
                {/*<h2 className="font-semibold text-lg w-fit max-w-[100px] tablet:max-w-fit">*/}
                {/*  {currentTour.groupSize} travelers*/}
                {/*</h2>*/}
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light whitespace-nowrap">Body Type</h2>
                {/*<h2 className="font-semibold text-lg">*/}
                {/*  {currentTour.isPlanet ? "Planet" : "Moon"}*/}
                {/*</h2>*/}
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col w-full gap-5 pt-2">
            {/*<Link*/}
            {/*  to="dates"*/}
            {/*  onClick={() =>*/}
            {/*    window.scrollTo({*/}
            {/*      top:*/}
            {/*        (navbar.current?.getBoundingClientRect().top as number) +*/}
            {/*        window.scrollY,*/}
            {/*      behavior: "smooth",*/}
            {/*    })*/}
            {/*  }*/}
            {/*  className="transition duration-200 p-2 bg-yellow-500 hover:bg-yellow-200 text-black*/}
            {/*font-semibold flex items-center justify-center gap-4"*/}
            {/*>*/}
            {/*  See dates & prices*/}
            {/*  <FaRegCalendar />*/}
            {/*</Link>*/}
            {/*<button*/}
            {/*  className="transition duration-200 bg-transparent border-2 border-white p-2 hover:bg-white*/}
            {/*font-semibold hover:text-black flex items-center justify-center gap-4 disabled:cursor-not-allowed"*/}
            {/*  onClick={handleClickFavorite}*/}
            {/*  disabled={isAdding || isDeleting}*/}
            {/*>*/}
            {/*  {isAdding || isDeleting ? (*/}
            {/*    <MiniSpinner />*/}
            {/*  ) : (*/}
            {/*    <>*/}
            {/*      {!idFavoriteTours.some(*/}
            {/*        (fav) => fav.tour_id === Number(id)*/}
            {/*      ) ? (*/}
            {/*        <>*/}
            {/*          Add to Favorite Tours*/}
            {/*          <FaRegBookmark />*/}
            {/*        </>*/}
            {/*      ) : (*/}
            {/*        <>*/}
            {/*          Delete from Favorite Tours*/}
            {/*          <FaRegTrashCan />*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
      {/*<div className="text-white pt-24 relative">*/}
      {/*  <ul*/}
      {/*    className={` text-white/40 flex border-b px-[5%] laptop:px-[0%] laptop:mx-[8%] border-b-white/20*/}
      {/*     flex-nowrap overflow-auto gap-10 whitespace-nowrap`}*/}
      {/*    ref={navbar}*/}
      {/*  >*/}
      {/*    <NavLinkTour route="." end={true}>*/}
      {/*      Overview*/}
      {/*    </NavLinkTour>*/}
      {/*    <NavLinkTour route="itinerary">Itinerary</NavLinkTour>*/}
      {/*    <NavLinkTour route="meeting">Meeting & Pickup</NavLinkTour>*/}
      {/*    <NavLinkTour route="dates">Dates & Prices</NavLinkTour>*/}
      {/*    <NavLinkTour route="reviews">Reviews</NavLinkTour>*/}
      {/*  </ul>*/}
      {/*  <div className="px-[8%]">*/}
      {/*    <Outlet />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </main>
  );
};
