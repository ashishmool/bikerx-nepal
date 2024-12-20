import { AboutUs } from "../features/AboutUs";
import { FAQ } from "../features/FAQ";
import { ReviewsHome } from "../features/ReviewsHome";
import { Services } from "../features/Services";
import { HomePhoto } from "../ui/HomePhoto";
import { motion } from "framer-motion";
import {Upcoming} from "../features/Upcoming.tsx";
export const Home = () => {
  /*ERRORS TO SOLVE
  NOTE: At the end erase all cardImages and tourImages as they are extracted from supabase, not from the project
  NOTE: Remove scroll bar height for the submenu of Specific Tour
  1. The Popup marker of the Leaflet map doesnt show in production.
  2. OPTIONAL:The navbar of the Specific Tour page should be fixed when exceed (like the search bar).
  5. When im in Profile, log out and then Log in, the app breaks
  */
    console.log('Token Check Home:::', localStorage.getItem("accessToken"));
  return (
    <main>
      <article className="h-[100vh] relative z-[1] ">
        <HomePhoto />
        <motion.div
          initial={{ opacity: 0, translateY: "-100%" }}
          animate={{ opacity: 1, translateY: "-40%" }}
          transition={{ duration: 1.0 }}
          className="absolute top-[50%] translate-y-[-50%] left-[10%] text-[--main-font-color] w-[80%] laptop:w-[50%]
           flex flex-col gap-6"
        >
          <h1 className="font-bold text-5xl tablet:text-6xl font-serif tracking-wide">
              Beyond the City Limits, Awaits the Himalayas!

          </h1>
          <p>This bike tour booking platform is tailored for adventure seekers wanting to explore Nepal on two wheels. It allows users to easily book guided motorcycle tours across diverse terrains, from peaceful valleys to challenging mountain trails. With options for all skill levels, the platform offers detailed itineraries, expert guides, and top-quality bikes, ensuring a safe and thrilling experience through Nepal’s stunning landscapes. Book your next Himalayan adventure here!</p>
        </motion.div>
      </article>
      <AboutUs />
        <Upcoming />
      <Services />
      <div className="grid grid-cols-1 full:grid-cols-2 gap-14 full:gap-0">
        <ReviewsHome />
        <FAQ />
      </div>
    </main>
  );
};
