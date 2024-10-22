import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ToursFoundText = () => {
    const { filteredTours, searchText } = useSelector(
        (store: RootState) => store.filterSorting
    );

    return (
        <div className="text-2xl mb-4">
            {searchText
                ? `${filteredTours.length} tours found for "${searchText}"`
                : `${filteredTours.length} tours available`}
        </div>
    );
};
