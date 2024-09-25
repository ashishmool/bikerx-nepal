import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProductsFoundText = () => {
    const { page, filteredProducts } = useSelector(
        (store: RootState) => store.filterSorting // Assuming the same slice for filtering
    );

    if (!filteredProducts?.length) {
        return (
            <span className="text-white/60 font-light">Showing 0 of 0 results</span>
        );
    }

    return (
        <span className="text-white/60 font-light">
      Showing {(page - 1) * 9 + 1}-
            {page === Math.ceil(filteredProducts.length / 9)
                ? filteredProducts.length
                : page * 9}{" "}
            of {filteredProducts.length} results
    </span>
    );
};
