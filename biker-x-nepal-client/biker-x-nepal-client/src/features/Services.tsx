import {
  FaPeopleGroup,
  FaMotorcycle,
  FaUsersRectangle,
} from "react-icons/fa6";

import { motion } from "framer-motion";

export const Services = () => {
  return (
    <div className="px-[3%] min-[1200px]:px-[10%] text-white flex flex-col items-center bg-transparent py-24 gap-4">
      <motion.h1
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl text-yellow-500"
      >
        OUR SERVICES
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className=" text-4xl laptop:text-5xl text-white font-semibold text-center"
      >
        Book your Journey to Ride and Explore!
      </motion.h3>
      <div className="w-full grid full:grid-cols-3 grid-cols-1 full:gap-0 gap-8 pt-8">
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl
      max-w-[350px]"
        >
          <FaUsersRectangle className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">We Capture Memories</h3>
          <p className="font-light text-center">
            Explore the breathtaking landscapes of Nepal's Himalayas with our affordable packages. Experience the thrill of the open road without breaking the bank, and leave the memory-capturing to us!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl
      max-w-[350px]"
        >
          <FaPeopleGroup className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">Individual/Groups</h3>
          <p className="font-light text-center">
            Embark on unforgettable motorcycle expeditions tailored for both solo riders and group adventures.
            Whether you're seeking solitary exploration or shared experiences with loved ones, our tours cater to
            your preferences.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl
      max-w-[350px]"
        >
          <FaMotorcycle className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">Customized Tours</h3>
          <p className="font-light text-center">
            Tailored to your preferences, our tours offer celestial
            levels of comfort and adventure, ensuring that every moment on the road is filled with unmatched thrills
            and unforgettable experiences.

          </p>
        </motion.div>
      </div>
    </div>
  );
};
