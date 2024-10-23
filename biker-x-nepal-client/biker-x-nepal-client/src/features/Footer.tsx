import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-[--third-color] text-[--main-font-color]">
      <div className="grid grid-cols-1 laptop:grid-cols-5 px-[4%] laptop:px-[10%] pt-20 pb-10">
        <div className="laptop:col-span-2 pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">About Us</h1>
          <span className="text-sm text-[--secundary-color] font-light laptop:text-justify">
          At <strong>RideNepal Adventures</strong>, our aim is to revolutionize the realm of motorcycle exploration and thrill-seeking.
          Established in 2021 by a team of passionate bikers, adventurers, and outdoor enthusiasts,
          our group is driven by the desire to make the extraordinary experiences of biking accessible to all.
          We are dedicated to pushing the boundaries of motorcycle travel and adventure, setting ourselves
          apart through our unwavering commitment to exploration and excitement.
          </span>

        </div>
        <div className=" pr-8 flex flex-col gap-8 mb-10">
          <h1 className="font-bold text-lg">Contact</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <li>Sukuldhoka Street, Golmadhi - 7</li>
            <li>+977-9803685830</li>
            <li>+977-(1)-6613038</li>
            <li>kajeshm15@gmail.com</li>
          </ul>
        </div>
        <div className=" pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">Connect</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
            >
              <li>Instagram</li>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <li>Facebook</li>
            </a>
            <a href="https://twitter.com/" target="_blank">
              <li>Twitter</li>
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <li>LinkedIn</li>
            </a>
          </ul>
        </div>
        <div className=" pr-8 flex flex-col gap-6 laptop:gap-8 mb-10">
          <h1 className="font-bold text-lg">Links</h1>
          <ul className="text-sm text-[--secundary-color] font-light grid gap-3 laptop:gap-4">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="tours">
              <li>Tours</li>
            </Link>
            <Link to="about">
              <li>About</li>
            </Link>
          </ul>
        </div>

      </div>
      <span className="block text-sm text-[--secundary-color] font-light text-center pb-14 pt-8">
        Developed by Ashish Mool {"©2024 BikerXNepal"}
      </span>
    </div>
  );
};
