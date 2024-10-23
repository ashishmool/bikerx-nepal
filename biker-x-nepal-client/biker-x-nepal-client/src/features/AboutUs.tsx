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
          WHO WE ARE
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl laptop:text-5xl text-white font-semibold"
        >
          The Call of the Himalayas: A Golden City Adventure Riders Story
        </motion.h3>
        <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light"
        >
          <p className="mt-4 mb-4">
            More than just a ride, we offer an experience that transforms you. From peaceful valleys to extreme mountain trails, our routes are crafted for every kind of rider. Imagine cruising past snow-capped peaks, through pine forests, with the rush of rivers beside you. Every path is a step into the unknown, a connection to nature and yourself.
          </p>

          <p className="mt-4 mb-4 indent-8">
            Whether you're an experienced rider or just starting, we invite you to join us in conquering the Himalayas and discovering Nepal in a way only a bike can offer.
          </p>

          <p className="mt-4 mb-4 text-amber-400">
            We are <span className="text-3xl font-bold">Golden City Adventure Riders</span>, and the journey is just beginning!
          </p>
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
          alt="Suspension Bridge Nepal"
          className="full:h-[300px]"
        />
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={temp2}
          alt="Bouddhanath Nepal"
          className="full:h-[300px] full:mt-12"
        />
      </div>
    </div>
  );
};
