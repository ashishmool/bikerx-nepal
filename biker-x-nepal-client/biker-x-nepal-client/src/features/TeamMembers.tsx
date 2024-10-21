import { motion } from "framer-motion";
import aadi from "../images/aboutUs/rider-2.jpg";
import founder from "../images/aboutUs/kajesh-mool.jpg";
import ashish from "../images/aboutUs/rider-4.jpg";

// Dummy data for the other two team members
const teamMembersData = [
  {
    name: "Kajesh Mool",
    quote: "Ride Safe, Ride Hard!",
    image: founder,
  },
  {
    name: "Aadi Bro",
    quote: "Adventure Awaits!",
    image: aadi, // Replace with actual image path
  },
  {
    name: "Ashish Mool",
    quote: "Explore Beyond Limits!",
    image: ashish, // Replace with actual image path
  },
];

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
            THE TEAM
          </motion.h1>

          {/* Flex container for team members */}
          <div className="flex justify-center gap-24">
            {teamMembersData.map((member, index) => (
                <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, translateY: "100%" }}
                    whileInView={{ opacity: 1, translateY: "0%" }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                  <motion.img
                      src={member.image}
                      alt={`Team member ${member.name}`}
                      className="h-[175px] rounded-full"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="font-semibold text-2xl">{member.name}</h2>
                    <h3 className="font-light">{member.quote}</h3>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
};
