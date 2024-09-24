import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";

export const Motorbikes = () => {
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
        <div className="text-white flex flex-wrap justify-center mb-24">
            {bikes.map((bike) => (
                <div
                    key={bike.bikeId}
                    className="text-white px-2 mt-12 flex flex-col items-center w-full laptop:w-1/3" // Set to 1/3 for 3 bikes on larger screens
                >
                    <img
                        height={300}
                        src={'data:image/png;base64,' + bike.image}
                        alt={bike.model}
                        className="object-cover h-48 mb-4"
                    />
                    <div className="flex flex-col items-center">
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
                </div>
            ))}
        </div>
    );
};
