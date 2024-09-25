import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FilterTag } from "./FilterTag"; // Ensure this component is available for displaying each filter tag
import { clearAllFilters } from "../features/FilterAndSorting/filterSortingSlice"; // Ensure this action clears product filters

export const ProductsTagsContainer = () => {
    const dispatch = useDispatch();
    const { addedFilters } = useSelector((store: RootState) => store.filterSorting); // Make sure this state is correctly set for products

    return (
        <>
            {addedFilters.map((filter) => (
                <FilterTag key={filter} text={filter} />
            ))}
            {!addedFilters.length ? (
                ""
            ) : (
                <button
                    className="text-white font-light transition-all duration-300 underline tracking-wider hover:text-[18px]"
                    onClick={() => dispatch(clearAllFilters())} // Adjust action if needed
                >
                    Clear all
                </button>
            )}
        </>
    );
};
