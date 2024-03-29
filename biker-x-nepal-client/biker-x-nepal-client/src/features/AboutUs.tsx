import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import temp1 from "../images/aboutUs/temp-1.jpg"
import temp2 from "../images/aboutUs/temp-2.jpg"
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

export const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div
      className="pt-24 full:px-[3%] min-[1200px]:px-[10%] flex
        full:flex-row flex-col gap-10 px-[10%] mb-12"
    >
      <div className="text-white flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl text-yellow-500"
        >
          ABOUT US
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl laptop:text-5xl text-white font-semibold"
        >
          Explore All Corners of Nepal With Us
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-light"
        >
          BikerXNepal is your gateway to the Himalayas, where dreams of exhilarating motorcycle
          adventures through Nepal's rugged landscapes become an awe-inspiring reality. Founded on a passion for
          exploration and an unwavering commitment to making the majestic Himalayas accessible to all, we're your
          trusted partner in experiencing the wonders of this breathtaking region on two wheels.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-2 border-white py-1 px-3 text-lg w-fit transition-colors duration-200
            hover:bg-white border-[--secundary-color] hover:text-black hover:font-semibold"
            onClick={()=>navigate("/about")}
        >
          <SportsMotorsportsIcon/> Read more...
        </motion.button>
      </div>
      <div className="grid grid-cols-2 full:pt-12 laptop:min-w-[550px] gap-10">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={temp1}
          alt="Titan image"
          className="full:h-[300px]"
        />
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={temp2}
          alt="Nereid image"
          className="full:h-[300px] full:mt-12"
        />
      </div>
    </div>
  );
};
