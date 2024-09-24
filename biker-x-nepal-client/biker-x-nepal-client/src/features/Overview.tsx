import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Overview = () => {
  const { currentTour } = useSelector((store: RootState) => store.currentTour);
  return (
    <div className="py-16 grid grid-cols-1 full:grid-cols-2 gap-y-12">
      <div className="flex flex-col items-start gap-8">
        <h1 className="text-4xl font-semibold tracking-wider text-yellow-500">Description</h1>
        <span className="text-white/60 font-light">
          {currentTour.description}
        </span>
      </div>
      <div className="full:mx-10 rounded-lg py-8 px-6 border-white/30 h-full bg-white/20">
        <h1 className="font-semibold text-xl mb-5">Your Tour Packages Includes:</h1>
        <ul className=" list-disc font-light tracking-wide pl-8 flex flex-col gap-3 text-white/70">
          <li>Bed & Breakfast</li>
          <li>Motorbike (NO GEARS!)</li>
          <li>Free Wi-Fi</li>
        </ul>
          <h1 className="font-semibold text-xl mb-5">Your Tour Package Excludes:</h1>
          <ul className=" list-disc font-light tracking-wide pl-8 flex flex-col gap-3 text-white/70">
              <li>Medical Insurance</li>
              <li>Biking Gear & Safety</li>
              <li>Driving License and Authority from Government of Nepal will cost extra.</li>
          </ul>
      </div>

    </div>
  );
};
