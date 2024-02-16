import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";

export const Vehicles = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bike/getAll");
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  return (
      <div className="text-white">
        <h1 className="text-center text-4xl full:text-5xl font-semibold mt-36">
          The Rides
        </h1>
        {bikes.map((bike) => (
            <div
                key={bike.bikeId}
                className="text-white px-[6%] full:px-[10%] mt-12 flex flex-col-reverse laptop:flex-row items-center
        gap-8 laptop:gap-0"
            >
              <div className="flex flex-col justify-between gap-5 laptop:pr-16 full:pr-24">
                <motion.h1
                    initial={{ opacity: 0, translateY: "100%" }}
                    whileInView={{ opacity: 1, translateY: "0%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center laptop:text-left text-3xl full:text-4xl text-yellow-500"
                >
                  {bike.model}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, translateY: "100%" }}
                    whileInView={{ opacity: 1, translateY: "0%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="font-light text-center laptop:text-left"
                >
                  {bike.description}
                </motion.p>
              </div>
              <img width={600} src={'data:image/png;base64,' + bike.image} alt={bike.image} />
            </div>
        ))}
      </div>
  );
};
