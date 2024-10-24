import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; // Importing the necessary icons

export const Footer = () => {
  return (
      <div className="bg-[--third-color] text-[--main-font-color]">
        <div className="grid grid-cols-1 laptop:grid-cols-5 px-[4%] laptop:px-[10%] pt-20 pb-10 gap-10">

          {/* About Us Section on the Left */}
          <div className="laptop:col-span-2 pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
            <h1 className="font-bold text-lg">About Us</h1>
            <span className="text-sm text-[--secundary-color] font-light laptop:text-justify">
            At <strong>Golden City Adventure Riders</strong>, our aim is to revolutionize the realm of motorcycle exploration and thrill-seeking.
            Established in 2021 by a team of passionate bikers, adventurers, and outdoor enthusiasts,
            our group is driven by the desire to make the extraordinary experiences of biking accessible to all.
            We are dedicated to pushing the boundaries of motorcycle travel and adventure, setting ourselves
            apart through our unwavering commitment to exploration and excitement.
          </span>
          </div>

          {/* Contact Section */}
          <div className="pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
            <h1 className="font-bold text-lg">Contact</h1>
            <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
              {/* Address (1st Row) */}
              <li>Sukuldhoka Street, Golmadhi - 7</li>

              {/* Phone and Email (2nd Row) */}
              <div className="grid gap-2">
                <li>+977-9803685830</li>
                <li>+977-(1)-6613038</li>
                <li>kajeshm15@gmail.com</li>
              </div>
            </ul>
          </div>

          {/* Links Section */}
          <div className="pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
            <h1 className="font-bold text-lg">Quick Links</h1>
            <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
              <Link to="/" className="hover:text-yellow-500">
                <li>Home</li>
              </Link>
              <Link to="/tours" className="hover:text-yellow-500">
                <li>Available Tours</li>
              </Link>
              <Link to="/shop" className="hover:text-yellow-500">
                <li>The Shop</li>
              </Link>
              <Link to="/about" className="hover:text-yellow-500">
                <li>Who We Are</li>
              </Link>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
            <h1 className="font-bold text-lg">Connect</h1>
            <ul className="flex items-center gap-4 text-[--secundary-color] text-2xl">
              <a
                  href="https://www.instagram.com/goldencity_adventuresriders/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500"
              >
                <FaInstagram />
              </a>
              <a
                  href="https://www.facebook.com/goldencityriders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500"
              >
                <FaFacebook />
              </a>
              <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500"
              >
                <FaYoutube />
              </a>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <span className="block text-sm text-[--secundary-color] font-light text-center pb-14 pt-8">
        Developed by Ashish Mool {"©2024 Golden City Adventure Riders"}
      </span>
      </div>
  );
};
