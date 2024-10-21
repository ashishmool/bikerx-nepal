import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from '../ui/Spinner';

export const Overview = () => {
    const { id } = useParams(); // Assuming tour id is passed as a param in the route
    const [currentTour, setCurrentTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the tour details from backend
    useEffect(() => {
        const fetchTourById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tour/getById/${id}`);
                setCurrentTour(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (id) {
            fetchTourById();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentTour) {
        return <div>Tour not found</div>;
    }

    return (
        <div className="py-16 grid grid-cols-1 full:grid-cols-2 gap-y-12">
            <div className="flex flex-col items-start gap-8">
                <h1 className="text-2xl font-semibold tracking-wider text-yellow-500">{currentTour.tourName}</h1>
                <span className="text-white/60 font-light">
          {currentTour.tourDescription}
        </span>
            </div>
            <div className="full:mx-10 rounded-lg py-8 px-6 border-white/30 h-full bg-white/20">
                <h1 className="font-semibold text-xl mb-5">Your Tour Packages Includes:</h1>
                <ul className="list-disc font-light tracking-wide pl-8 flex flex-col gap-3 text-white/70">
                    <li>Bed & Breakfast</li>
                    <li>Motorbike (NO GEARS!)</li>
                    <li>Free Wi-Fi</li>
                </ul>
                <h1 className="font-semibold text-xl mb-5">Your Tour Package Excludes:</h1>
                <ul className="list-disc font-light tracking-wide pl-8 flex flex-col gap-3 text-white/70">
                    <li>Medical Insurance</li>
                    <li>Biking Gear & Safety</li>
                    <li>Driving License and Authority from Government of Nepal will cost extra.</li>
                </ul>
            </div>
        </div>
    );
};
