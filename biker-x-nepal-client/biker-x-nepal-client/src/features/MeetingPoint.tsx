import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import marker from "../images/marker/location-pin.png";
import markerShadow from "../images/marker/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const MeetingPoint = () => {
  var greenIcon = L.icon({
    iconUrl: marker,
    shadowUrl: markerShadow,

    iconSize: [38, 38], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [20, 32], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -46], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <div className="my-4">
      <div className="grid full:grid-cols-2 full:mb-20 mb-10">
        <div className="flex flex-col p-5 gap-4">
          <h3 className="text-lg text-yellow-500">Bhaktapur, Nepal</h3>
          <h1 className="text-4xl tablet:text-5xl font-bold">
            City Guest House
          </h1>
        </div>

        <span className="p-5 grid place-content-center text-white/60 font-ligh gap-4">
          BikerXnepal's City Guest House, Bhaktapur, offers sustainable accommodation near Bhaktapur Durbar Square.
          With amenities like a shared kitchen, free WiFi, and bike rental, guests can explore nearby sightseeing tours.
          Rooms feature private bathrooms, some with balconies. The guest house is conveniently located near Patan
          Durbar Square and Boudhanath Stupa, with Tribhuvan International Airport just 5.6 miles away, offering
          a paid airport shuttle service.

        </span>
      </div>
      <MapContainer
          center={[27.6725, 85.4294]} // Coordinates for Bhaktapur, Nepal
          zoom={15} // Zoom level adjusted for better visibility
          scrollWheelZoom={false}
          style={{ width: "100%" }}
          className="h-[600px] full:h-[400px] relative z-[1]"
      >
        <TileLayer
            url="https://api.maptiler.com/maps/dataviz-dark/256/{z}/{x}/{y}.png?key=LwOQqecOmbpsAob5UxA1"
        />
        <Marker position={[27.6725, 85.4294]} icon={greenIcon}> // Marker positioned at City Guest House, Bhaktapur
          <Popup className="bg-black">
            <p className="">City Guest House, Bhaktapur</p>
          </Popup>
        </Marker>
      </MapContainer>

      <ul className=" mt-10 flex items-start gap-y-14 gap-10 laptop:gap-20 flex-wrap justify-between laptop:justify-start">
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaLocationDot /> ADDRESS
          </div>
          <div className="flex flex-col font-light text-white/60">
            <span>Sukuldhoka Street, Golmadhi, Ward No. 7</span>
            <span>Bhaktapur, Nepal 44800</span>
          </div>
        </li>
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaPhone /> CONTACT INFORMATION
          </div>
          <div className="flex flex-col font-light text-white/60">
            <div className="flex items-center gap-6 w-[180px] laptop:w-[200px] justify-between">
              <span>Mobile:</span>
              <span>+977-9803685830</span>
            </div>
            <div className="flex items-center gap-6 w-[180px] laptop:w-[200px] justify-between">
              <span>Landline:</span>
              <span>+977-(1)-6613038</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaClock /> HOURS OF OPERATION
          </div>
          <span className="flex flex-col font-light text-white/60">
            10:00 AM - 7:00 PM
          </span>
        </li>
      </ul>
    </div>
  );
};
