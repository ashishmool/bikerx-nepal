import { motion } from "framer-motion";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios from 'axios';

export const ReviewsHome = () => {
    const [reviewNo, setReviewNo] = useState(0);
    const [isOver, setIsOver] = useState(false);
    const [reviewsHome, setReviewsHome] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/testimonial/getAll');
                const fetchedReviews = response.data;
                console.log('Fetched Reviews:::', fetchedReviews);
                setReviewsHome(fetchedReviews); // Update state with fetched reviews
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();

        let myInterval;
        if (!isOver && reviewsHome.length > 1) { // Check if there are more than 1 review fetched
            myInterval = setInterval(() => {
                setReviewNo((prev) => (prev === reviewsHome.length - 1 ? 0 : prev + 1));
            }, 5000);
        }

        return () => clearInterval(myInterval);
    }, []); // Empty dependency array to run effect only once on mount


    return (
        <div className="text-white flex flex-col gap-4 relative border-red-500 pb-5 px-[10%] full:px-[3%] min-[1200px]:px-[10%]">
            <motion.h1
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl text-yellow-500 text-center full:text-left"
            >
                WHAT OUR CUSTOMERS SAY
            </motion.h1>
            <motion.h3
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl laptop:text-5xl font-semibold text-center full:text-left"
            >
                Latest Reviews
            </motion.h3>
            <motion.div
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 full:mt-12 h-[450px] full:h-[350px] overflow-hidden relative"
            >
                {reviewsHome.map((fetchedReview, index) => (
                    <motion.div
                        initial={{ x: `${index * 100 - reviewNo * 100}%` }}
                        animate={{ x: `${index * 100 - reviewNo * 100}%` }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                        key={index}
                        onMouseEnter={() => setIsOver(true)}
                        onMouseLeave={() => setIsOver(false)}
                    >
                        <div className="relative">
                            <p className="text-2xl laptop:text-3xl text-center mb-5 laptop:mt-0">{fetchedReview.title}</p>
                            <span className="block text-9xl h-[60px] px-4">"</span>
                            <Rate
                                value={fetchedReview.reviewRating}
                                disabled={true}
                                className="block text-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                            />
                        </div>
                        <div className="grid gap-4 mt-4 full:mt-0">
                            <p className="font-light text-center h-fit">{fetchedReview.description}</p>
                            <p className="text-2xl laptop:text-3xl text-center mt-5 laptop:mt-0">{fetchedReview.fullName}</p>
                            <p className="underline text-center transition-all duration-200 text-yellow-500">{fetchedReview.company}</p>
                            <p className="font-light text-center h-fit">{fetchedReview.designation}</p>
                            <p className="text-center font-light">
                                <strong>Reviewed On:</strong> {new Date(fetchedReview.date).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <div
                className="mx-auto flex gap-2"
                onMouseEnter={() => setIsOver(true)}
                onMouseLeave={() => setIsOver(false)}
            >
                {reviewsHome.map((_, index) => (
                    <button
                        key={index}
                        className={`border-2 h-4 w-4 rounded-full relative ${index == reviewNo && "bg-white"}`}
                    >
                        <input
                            key={index}
                            type="radio"
                            value={index}
                            name="reviewNo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setReviewNo(Number(e.target.value) as any)}
                            checked={reviewNo == index}
                            className="absolute top-0 left-0 opacity-0 cursor-pointer"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
