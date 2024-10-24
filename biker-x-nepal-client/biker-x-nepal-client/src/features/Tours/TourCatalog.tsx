import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { closeThemAll, setSelectedFilters, cleanSearchBar } from "../FilterAndSorting/filterSortingSlice";
import { FaSliders } from "react-icons/fa6";
import { RootState } from "../../store";
import { ToursFoundText } from "../../ui/ToursFoundText";
import { ITours } from "../../moduls";
import { TourCard } from "./TourCard";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ToursTagsContainer } from "../../ui/ToursTagsContainer";
import { NextAndPreviousBtn } from "../../ui/NextAndPreviousBtn";

export const TourCatalog = () => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, undefined, AnyAction>;
  const { isLoading, selectedFilters, searchText, page } = useSelector((store: RootState) => store.filterSorting);

  const filterNSort = useRef<null | HTMLDivElement>(null);

  const [tours, setTours] = useState<ITours[]>([]);
  const [filteredTours, setFilteredTours] = useState<ITours[]>([]);
  const [groupSize, setGroupSize] = useState<string>(''); // State for group size selection
  const [tourType, setTourType] = useState<string>(''); // State for tour type selection
  const [duration, setDuration] = useState<string>(''); // State for duration selection
  const [uniqueTourTypes, setUniqueTourTypes] = useState<string[]>([]); // State for unique tour types

  // Fetch all tours when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tour/getAll");
        setTours(response.data);

        // Extract unique tour types
        const uniqueTypes = [...new Set(response.data.map((tour: ITours) => tour.tourType))];
        setUniqueTourTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = tours;

      // Apply search filter
      if (searchText) {
        filtered = filtered.filter((tour) =>
            tour.tourName.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // Apply selected filters
      filtered = filtered.filter((tour) => {
        // Group Size Filter
        let groupSizeMatch = true;
        if (groupSize) {
          if (groupSize === "Upto 10") {
            groupSizeMatch = tour.maxParticipants <= 10;
          } else if (groupSize === "Upto 15") {
            groupSizeMatch = tour.maxParticipants <= 15;
          } else if (groupSize === "Upto 25") {
            groupSizeMatch = tour.maxParticipants <= 25;
          }
        }

        // Tour Type Filter
        const tourTypeMatch = tourType ? tour.tourType === tourType : true;

        // Duration Filter
        let durationMatch = true;
        if (duration) {
          const tourDuration = calculateTourDuration(tour.startDate, tour.endDate);
          if (duration === "Less than 7 Days") {
            durationMatch = tourDuration < 7;
          } else if (duration === "More than 7 Days") {
            durationMatch = tourDuration >= 7;
          }
        }

        // Return true only if all conditions match
        return groupSizeMatch && tourTypeMatch && durationMatch;
      });

      setFilteredTours(filtered); // Update local filteredTours state
    };

    if (tours.length) {
      applyFilters(); // Apply filters whenever tours or selected filters are updated
    }
  }, [tours, searchText, groupSize, tourType, duration]);

  const handleGroupSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGroupSize(event.target.value); // Update group size based on dropdown selection
  };

  const handleTourTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTourType(event.target.value); // Update tour type based on dropdown selection
  };

  const handleDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDuration(event.target.value); // Update duration based on dropdown selection
  };

  const resetFilters = () => {
    setGroupSize(''); // Reset group size
    setTourType(''); // Reset tour type
    setDuration(''); // Reset duration
    dispatch(cleanSearchBar()); // Reset search text and filters
  };

  // Function to calculate the duration between two dates
  const calculateTourDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end.getTime() - start.getTime();
    const durationInDays = durationInMilliseconds / (1000 * 3600 * 24); // Convert milliseconds to days
    return durationInDays;
  };

  return (
      <div className="pt-24 px-[8%]">
        {isLoading ? (
            <div>Loading...</div> // Replace with your actual Spinner component if needed
        ) : (
            <>
              {/* Filter and sorting UI */}
              <div className="text-white flex gap-4 h-[60px] text-lg text-[--third-color] border-[#ffffff34] mb-4 relative z-[2]" ref={filterNSort}>
                {/* Group Size Filter */}
                <div className="relative w-full">
                  <select
                      id="group-size"
                      value={groupSize}
                      onChange={handleGroupSizeChange}
                      className="w-full bg-black text-white border border-[#ffffff34] text-lg h-[60px] flex items-center px-4 rounded-md shadow-md transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  >
                    <option value="">Select Group Size</option>
                    <option value="Upto 10">Upto 10</option>
                    <option value="Upto 15">Upto 15</option>
                    <option value="Upto 25">Upto 25</option>
                  </select>
                </div>

                {/* Tour Type Filter */}
                <div className="relative w-full">
                  <select
                      id="tour-type"
                      value={tourType}
                      onChange={handleTourTypeChange}
                      className="w-full bg-black text-white border border-[#ffffff34] text-lg h-[60px] flex items-center px-4 rounded-md shadow-md transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  >
                    <option value="">Select Tour Type</option>
                    {/* Dynamically generate the options */}
                    {uniqueTourTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div className="relative w-full">
                  <select
                      id="duration"
                      value={duration}
                      onChange={handleDurationChange}
                      className="w-full bg-black text-white border border-[#ffffff34] text-lg h-[60px] flex items-center px-4 rounded-md shadow-md transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  >
                    <option value="">Select Duration</option>
                    <option value="Less than 7 Days">Less than 7 Days</option>
                    <option value="More than 7 Days">More than 7 Days</option>
                  </select>
                </div>

                {/* Reset Filters Button (40% smaller) */}
                <button
                    className="w-[60%] justify-center bg-black text-[#fff] flex border border-[#ffffff34] items-center transition-all duration-300 hover:underline text-md py-2"
                    onClick={resetFilters}
                >
                  <FaSliders />
                  <span className="ml-3">Reset Filters</span> {/* Added margin for spacing between icon and text */}
                </button>
              </div>

              {/* Tours found text and tags container */}
              <div className="flex items-center gap-5 flex-wrap">
                <ToursFoundText count={filteredTours.length} /> {/* Pass the count to ToursFoundText */}
                <ToursTagsContainer selectedFilters={selectedFilters} />
              </div>

              {/* Render tours or no results message */}
              {filteredTours.length ? (
                  <div className="pb-10 relative">
                    <div className="grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8 pt-12">
                      {filteredTours.map((tour: ITours) => (
                          <TourCard key={tour.tourId} {...tour} />
                      ))}
                    </div>
                    <NextAndPreviousBtn />
                  </div>
              ) : (
                  <div className="text-white text-center pt-12">No tours found matching the filters.</div>
              )}
            </>
        )}
      </div>
  );
};
