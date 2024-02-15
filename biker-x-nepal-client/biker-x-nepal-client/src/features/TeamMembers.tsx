import { motion } from "framer-motion";
import founder from "../images/aboutUs/kajesh-mool.jpg"


export const TeamMembers = () => {
  return (
    <div className="text-white px-8 laptop:px-[10%] pb-28">

      <div className="flex flex-col items-center mt-24 gap-6">
        <motion.h1
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center laptop:text-left text-3xl full:text-4xl my-10 text-yellow-500"
        >
          OWNER AND FOUNDER
        </motion.h1>
        <motion.img
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src={founder}
          alt="CEO of AstroXplorer"
          className="h-[175px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="font-semibold text-2xl">Kajesh Mool</h2>
          <h3 className="font-light">"Ride Safe, Ride Hard!"</h3>
        </motion.div>
      </div>

    </div>
  );
};
