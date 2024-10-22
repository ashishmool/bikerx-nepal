import { Link } from "react-router-dom"; // Ensure you import Link from react-router-dom
import { FaChevronRight } from "react-icons/fa"; // Import the icon

const Breadcrumb = ({ tour }) => {
    return (
        <nav className="flex items-center">
      <span className="gap-2">
        <Link to="/tours" className="text-yellow-500 hover:underline"> {/* Adjust the styling as needed */}
            Tours
        </Link>
        <FaChevronRight className="scale-[0.7] inline-block" />
        <span className="text-white">{tour.tourName}</span>
      </span>
        </nav>
    );
};

export default Breadcrumb;
