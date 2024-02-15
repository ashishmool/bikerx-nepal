import { useEffect, useRef, useState } from "react";
import { Coordinates} from "../../moduls";
// import { ImageCont } from "../../ui/ImageCont";
import { BlurBall } from "../../ui/BlurBall";
import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'

export const TourCard = ({
                           image,
                           tourPrice,
                           tourName,
                           // Need to use tourDuration instead of Start Date,
    startDate,
    endDate,
                           tourDuration,

                           tourId,
                           tourRating,
                           totalReviews,
    maxParticipants,
                         }: {
  image: string;
  tourPrice: number;
  tourName: string;
  tourDuration: number;
  startDate: string;
  endDate: string;
  tourId: number;
  tourRating: number;
  totalReviews: number;
  maxParticipants: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ offsetX, offsetY }, setOffset] = useState<Coordinates>({
    offsetX: 0,
    offsetY: 0,
  });

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  // Calculate the difference in days
  const differenceInDays = Math.floor(
      (parsedEndDate.getTime() - parsedStartDate.getTime()) / (1000 * 3600 * 24)
  );


  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      ref.current.style.minHeight = `${width * 0.8}px`;
    }
    const adjustHeight = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        ref.current.style.minHeight = `${width * 0.8}px`;
      }
    };
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    setOffset({ offsetX, offsetY });
  }

  return (
      <div
          className="group relative overflow-hidden p-px mb-8 text-white bg-gradient-to-b
        from-white/20 to-white/0 hover:translate-x-1 hover:-translate-y-1 transition-all duration-200"
          onMouseMove={handleMove}
          ref={ref}
      >
        <div
            className="flex flex-col h-full gap-8 laptop:gap-4 p-4 bg-gradient-to-b
          from-[#0303037a] to-[#00000081]"
        >
          <BlurBall offsetX={offsetX} offsetY={offsetY} />
          <img width={450} src={'data:image/png;base64,'+image} />
          <div className="relative h-full flex flex-col flex-1 gap-5 laptop:gap-3 justify-between">
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-bold text-lg text-left">{tourName}</h1>

              <p className="font-light text-white/50">{parsedStartDate.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })} - {parsedEndDate.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</p>
              <p className="font-medium text-sm text-left">
                Duration: {differenceInDays} days
              </p>
              <StarRating tourRating={tourRating} />{" "}
              {!totalReviews ? (
                  <span className="font-light text-white/70 italic">No reviews yet</span>
              ) : (
                  <div className="flex gap-3 font-light text-white/70 items-center">
                    <StarRating tourRating={tourRating} />{" "}
                    <span className="mb-1">{`(${totalReviews})`}</span>
                  </div>
              )}
            </div>
            <h3 className="font-medium text-md text-left">Max. Participants: {maxParticipants}</h3>

            <div className="flex justify-between items-end">
            <span className="font-bold">From Rs.{String(tourPrice).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
            )}.*</span>
              <Link
                  to={`/tours/${String(tourId)}`}
                  className="px-3 py-2 border-2 border-white/50 bg-transparent hover:bg-white/90 hover:text-black
                transition duration-200"
              >
                <TwoWheelerIcon/> View Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
