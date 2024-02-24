import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { homeImages } from "../utils/homeImages";
import { IHomeBg } from "../moduls";
import { motion } from "framer-motion";

export const HomePhoto = () => {
  const [photos, setPhotos] = useState(homeImages);
  const [isStoped] = useState(false);

  useEffect(() => {
    let timerImage: any;
    if (!isStoped) {
      timerImage = setInterval(() => {
        setPhotos((prev: IHomeBg[]) => {
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
      }, 5000);
    }

    return () => clearInterval(timerImage);
  }, [isStoped]);
  return (
    <div className="relative h-full w-full overflow-hidden">

      {photos.map((photo, index) => {
        const { position, image } = photo;

        return (
          <div
            key={index}
            className={`transition-[transform] duration-300 absolute h-full w-full bg-[url('/src/images/bgImages/${image}.jpg')] bg-cover bg-bottom
            before:content-[''] before:absolute before:inset-0 before:bg-black/50 ${position}`}
          >
            <motion.div
              initial={{ opacity: 0, translateY: "200%" }}
              animate={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 1.0 }}
              className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6"
            >
              <FaLocationDot/>Conquer Nepal's Terrain: Ride, Travel, Explore!
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
