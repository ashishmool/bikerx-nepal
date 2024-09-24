import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ItinerarySection {
  itineraryId: number;
  tourId: number;
  noOfDays: number;
  description: string;
}

export const Itinerary = () => {
  // Fetch 'id' from the URL using useParams (matches ':id' in the route)
  const { id: tourId } = useParams<{ id: string }>(); // 'id' corresponds to 'tours/:id' in the route
  const [itinerary, setItinerary] = useState<ItinerarySection | null>(null); // State to store a single itinerary object
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track any errors

  console.log("fetch Tour ID:::", tourId);

  useEffect(() => {
    // Fetch itinerary by tourId from API
    const fetchItinerary = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        const response = await axios.get<ItinerarySection>(
            `http://localhost:8080/itinerary/getByTourId/${tourId}` // Use tourId in API URL
        );

        console.log("Response Itinerary:::: ", response.data);
        setItinerary(response.data); // Set the single itinerary object directly
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        setError("Failed to fetch itinerary data.");
      } finally {
        setLoading(false); // Set loading to false when request is done
      }
    };

    if (tourId) {
      fetchItinerary(); // Fetch itinerary if tourId exists
    }
  }, [tourId]); // Rerun effect when tourId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  if (!itinerary) {
    return <div>No itinerary found for this tour.</div>; // Handle no itinerary case
  }

  return (
      <div className="py-16">
        <div className="mb-10 border-b pb-4">
          <h2 className="text-xl font-semibold">
            Day {itinerary.noOfDays}: {itinerary.description}
          </h2>
          {/* Add any additional details here if needed */}
        </div>
      </div>
  );
};
