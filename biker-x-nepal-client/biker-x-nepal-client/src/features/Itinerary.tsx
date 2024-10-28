import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

interface ItinerarySection {
  itineraryId: number;
  tourId: number;
  noOfDays: number;
  tourItinerary: string;
  tourPdf: string; // URL to the uploaded PDF file
}

export const Itinerary = () => {
  const { id: tourId } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<ItinerarySection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<ItinerarySection>(`http://localhost:8080/tour/getById/${tourId}`);
        setItinerary(response.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        setError("Failed to fetch itinerary data.");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchItinerary();
    }
  }, [tourId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!itinerary || !itinerary.tourItinerary) {
    return <div>No itinerary found for this tour.</div>;
  }

  const daySections = itinerary.tourItinerary.split(/(Days?\s*\d+(?:\s*[-toTO]+\s*\d+)*\s*:)/i).filter(Boolean);

  return (
      <div className="py-4 grid grid-cols-1 laptop:grid-cols-2 gap-y-12 gap-x-8">
        {/* Left Section: Itinerary text */}
        <div className="flex flex-col items-start gap-8 overflow-hidden" style={{ width: "80%" }}>
          <div className="mb-10 pb-4">
            {daySections.map((section, index) => {
              const isDayHeader = /Days?\s*\d+(?:\s*[-toTO]+\s*\d+)*\s*:/i.test(section.trim());
              return (
                  <p key={index} className={isDayHeader ? "font-bold text-yellow-500" : "text-base"} style={isDayHeader ? { marginTop: '1rem' } : {}}>
                    {section.trim()}
                  </p>
              );
            })}
          </div>
        </div>

        {/* Right Section: Download button */}
        <div className="flex items-start cursor-pointer hover:text-yellow-500">
          <FaDownload className="mr-2" />Detailed Itinerary
        </div>

      </div>
  );
};
