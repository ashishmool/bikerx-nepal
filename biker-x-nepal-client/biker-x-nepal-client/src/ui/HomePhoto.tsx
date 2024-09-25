import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { homeImages } from "../utils/homeImages";
import { IHomeBg } from "../moduls";
import { motion } from "framer-motion";

export const HomePhoto = () => {
  const [photos, setPhotos] = useState<IHomeBg[]>(homeImages);
  const [isStopped] = useState(false); // Minor typo fix (from isStoped to isStopped)

  useEffect(() => {
    let timerImage: NodeJS.Timeout;
    if (!isStopped) {
      timerImage = setInterval(() => {
        setPhotos((prev: IHomeBg[]) => {
          // Shift the positions: active -> before, before -> after, after -> active
          const newArray = prev.map((photo) => {
            switch (photo.position) {
              case "active":
                return { ...photo, position: "before" };
              case "before":
                return { ...photo, position: "after" };
              case "after":
                return { ...photo, position: "active" };
              default:
                return photo;
            }
          });
          return newArray;
        });
      }, 5000); // 5-second interval
    }

    // Cleanup on unmount
    return () => clearInterval(timerImage);
  }, [isStopped]);

  return (
      <div className="relative h-full w-full overflow-hidden">
        {photos.map((photo, index) => {
          const { position, image } = photo;

          // Use inline styles for dynamic background images
          return (
              <div
                  key={index}
                  style={{
                    backgroundImage: `url(/src/images/bgImages/${image}.jpg)`, // Dynamically set the background image
                  }}
                  className={`transition-transform duration-300 absolute h-full w-full bg-cover bg-bottom 
            before:content-[''] before:absolute before:inset-0 before:bg-black/50 ${position}`}
              >
                <motion.div
                    initial={{ opacity: 0, translateY: "200%" }}
                    animate={{ opacity: 1, translateY: "0%" }}
                    transition={{ duration: 1.0 }}
                    className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6"
                >
                  {/* Show tourName */}
                  <h2 className="text-4xl font-bold">{photo.tourName}</h2>
                  <FaLocationDot />
                  Conquer Nepal's Terrain: Ride, Travel, Explore!
                </motion.div>
              </div>
          );
        })}
      </div>
  );
};
