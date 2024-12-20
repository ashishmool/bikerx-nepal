import { ChangeEvent } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeText, cleanSearchBar } from "./filterSortingSlice";

export const TourSearchBar = () => {
  const { searchText, isFixed } = useSelector(
      (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();

  return (
      <div
          className={`bg-[#dbdbdb96] w-[90%] tablet:w-[75%] full:w-[60%] left-[50%] translate-x-[-50%]
          h-[50px] laptop:h-[60px] p-[3px] ${
              isFixed
                  ? `fixed top-[10px] z-[10]`
                  : ` absolute z-[2] top-[-25px] laptop:top-[-30px]`
          }`}
      >
        <input
            type="text"
            placeholder="Search tour"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(changeText(e.target.value))
            }
            value={searchText}
            className="bg-[#1d1d1d]  py-1 px-12 text-white inline-block focus:bg-[#3b3b3b]
          text-xl w-full focus:outline-none h-full font-light"
        />

        <div className="text-[#c7c7c7] absolute top-[50%] translate-y-[-50%] left-5 scale-[1.5]">
          <FaMagnifyingGlass />
        </div>
        {searchText.length > 0 && (
            <button
                className="text-[#c7c7c7] absolute top-[50%] translate-y-[-50%] right-5 scale-[1.5]"
                onClick={() => dispatch(cleanSearchBar())}
            >
              <FaXmark />
            </button>
        )}
      </div>
  );
};
