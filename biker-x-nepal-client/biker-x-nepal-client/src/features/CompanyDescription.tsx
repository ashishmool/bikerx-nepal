import { motion } from "framer-motion";
// import groupOfAstronauts from "../images/aboutUs/group-of-astronauts-2.jpg"
// import groupOfAstronauts2 from "../images/aboutUs/astronaut-2.jpg"
import pagalToli from "../images/aboutUs/who-we-are.jpg"
import chooseUs from "../images/aboutUs/why-choose-us.jpg"


export const CompanyDescription = () => {
  return (
    <>
      <div
        className="text-white px-[6%] full:px-[10%] mt-24 flex flex-col laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <div className="flex flex-col justify-between gap-5 laptop:pr-16 full:pr-32">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-4xl full:text-5xl font-semibold"
          >
            Who We Are?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light full:text-lg text-center laptop:text-left"
          >
            At BikerXNepal, we're a dedicated group of motorcycle enthusiasts, eager to share the thrill
            of exploration with fellow riders. Our team comprises bikers, mechanics, and adventurers,
            united in our quest to make the world of motorcycle adventure accessible to everyone. By combining the
            essence of biking with the spirit of exploration, we craft exhilarating journeys that ignite your sense
            of discovery and leave you with unforgettable memories.
          </motion.p>
        </div>
        <img
          src={pagalToli}
          alt="Group of astronauts"
          className="h-[300px] full:h-[400px]"
        />
      </div>
      <div
        className="text-white px-[6%] full:px-[10%] mt-24 flex flex-col-reverse laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <img
          src={chooseUs}
          alt="Group of astronauts 2"
          className="h-[300px] full:h-[400px]"
        />
        <div className="flex flex-col justify-between gap-5 laptop:pl-16 full:pl-32">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-4xl full:text-5xl font-semibold"
          >
            Why Choose Us?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light full:text-lg text-center laptop:text-left"
          >
            BikerXNepal distinguishes itself with unparalleled expertise in motorcycle exploration. Our
            seasoned team guarantees your safety and excitement throughout every adventure. We leverage state-of-the-art
            technology, uphold rigorous safety protocols, and champion sustainability. Each expedition provides
            educational insights, exhilarating moments, and inclusivity for all. With BikerXNepal, you'll embark on
            an unforgettable journey through rugged terrains, fulfilling your dreams of boundless exploration.
          </motion.p>
        </div>
      </div>
    </>
  );
};
