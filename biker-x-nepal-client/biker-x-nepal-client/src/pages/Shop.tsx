import { useEffect, useRef } from "react";
import { ProductSearchBar } from "../features/FilterAndSorting/ProductSearchBar"; // Ensure this component exists
// import { useDispatch } from "react-redux";
// import { RootState } from "../store";
// import {
//     closeThemAll,
//     getAllProducts, // Replace with your action to fetch products
//     toggleFixing,
// } from "../features/FilterAndSorting/filterSortingSlice";
// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ProductSidebar } from "../features/FilterSidebar/ProductSidebar"; // Ensure this component exists
import { Services } from "../features/Services";
import { motion } from "framer-motion";
import { ReviewsHome } from "../features/ReviewsHome";
import { FAQ } from "../features/FAQ";
import { ShopCatalog } from "../features/Shop/ShopCatalog.tsx"; // Make sure this is the correct path

export const Shop = () => {
    // const dispatch = useDispatch() as ThunkDispatch<RootState, undefined, AnyAction>;
    // const filterNSort = useRef<null | HTMLDivElement>(null);
    const catalog = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     const handleClick = (e: MouseEvent) => {
    //         if (filterNSort.current && !filterNSort.current.contains(e.target as Node)) {
    //             dispatch(closeThemAll());
    //         }
    //     };
    //     document.addEventListener("click", handleClick, true);
    //     return () => document.removeEventListener("click", handleClick, true);
    // }, [dispatch]);
    //
    // useEffect(() => {
    //     const handleDropdownMenuMov = () => {
    //         dispatch(closeThemAll());
    //     };
    //     document.addEventListener("scroll", handleDropdownMenuMov);
    //     return () => document.removeEventListener("scroll", handleDropdownMenuMov);
    // }, [dispatch]);
    //
    // useEffect(() => {
    //     dispatch(getAllProducts()); // Action to fetch products
    // }, [dispatch]);
    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 360 && window.scrollY < (360 + (catalog.current?.scrollHeight as number))) {
    //             dispatch(toggleFixing(true));
    //         } else {
    //             dispatch(toggleFixing(false));
    //         }
    //     };
    //     document.addEventListener("scroll", handleScroll);
    //     return () => document.removeEventListener("scroll", handleScroll);
    // }, [dispatch]);

    return (
        <main className="relative">
            <ProductSidebar /> {/* Sidebar for filtering products */}
            <div
                className="h-[400px] relative w-full bg-[url('/src/images/bgImages/mars-bg.jpg')] bg-cover bg-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
            >
                <motion.h1
                    initial={{ opacity: 0, translateY: "-200%" }}
                    animate={{ opacity: 1, translateY: "-50%" }}
                    transition={{ duration: 1.0 }}
                    className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center
        font-bold text-5xl tablet:text-6xl font-serif tracking-wide z-[0]"
                >
                    Shop
                </motion.h1>
            </div>
            <div className="relative">
                <ProductSearchBar /> {/* Search bar component for products */}
            </div>
            <div ref={catalog}>
                <ShopCatalog /> {/* Product catalog displaying products */}
            </div>
            <Services />
            <div className="px-[10%] full:px-[3%] min-[1200px]:px-[10%] grid grid-cols-1 full:grid-cols-2 gap-14 full:gap-0 mt-20">
                <ReviewsHome />
                <FAQ />
            </div>
        </main>
    );
};
