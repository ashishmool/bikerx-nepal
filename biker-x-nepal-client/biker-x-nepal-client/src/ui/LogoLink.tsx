import { Link } from "react-router-dom";
import logo from "../assets/goldenCity.svg"; // Import the SVG as an image

export const LogoLink = () => {
    return (
        <div className="flex items-center text-2xl font-spacex">
            <Link to="/" className="flex items-center">
                {/* Use the img tag to display the SVG */}
                <img src={logo} alt="Golden City Logo" className="h-28 w-80 mr-2" />
                {/*BikerX Nepal*/}
            </Link>
        </div>
    );
};
