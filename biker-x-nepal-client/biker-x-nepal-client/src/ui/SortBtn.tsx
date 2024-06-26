import { ChangeEvent, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { sortingOptions } from "../utils/filterBarOptions.tsx";
import { ISorting } from "../moduls";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentSorting,
  closeThemAll,
  openOneOfThem,
} from "../features/FilterAndSorting/filterSortingSlice";
import { RootState } from "../store";

export const SortBtn = () => {
  const dispatch = useDispatch();
  const { areTheyOpen, currentSorting } = useSelector(
    (store: RootState) => store.filterSorting
  );
  useEffect(() => {
    dispatch(closeThemAll());
  }, [currentSorting]);
  return (
    <div
      className={`relative h-[60px] w-full bg-transparent hidden full:block ${
        areTheyOpen.sort ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <button
        className="flex items-center justify-between text-left border border-[#ffffff34] h-[100%]
              transition-all duration-300 hover:underline px-[20px] bg-black w-full"
        onClick={(e) =>
          dispatch(openOneOfThem((e.target as HTMLButtonElement).name))
        }
        name="sort"
      >
        Sort
        <FaChevronDown
          className={`text-[#fff] scale-x-[0.6] scale-y-[0.8] transition-all duration-300
        ${areTheyOpen.sort ? " rotate-0" : " rotate-180"}`}
          style={{ pointerEvents: "none" }}
        />
      </button>
      <ul className="border border-[#ffffff34] mt-3 bg-black absolute w-full p-3 z-[2] flex flex-col gap-2">
        {sortingOptions.map((option) => {
          return (
            <label
              key={option.idFull}
              className="flex justify-start items-center gap-4 font-light cursor-pointer"
              htmlFor={option.idFull}
            >
              <span className={`h-5 w-5 rounded-full border-2 absolute`}>
                <span
                  className={`absolute inset-1 rounded-full ${
                    currentSorting === option.idShared ? "bg-white" : "bg-transparent"
                  }`}
                ></span>
              </span>
              <input
                type="radio"
                id={option.idFull}
                name="sort"
                value={option.idShared}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(changeCurrentSorting(e.target.value as ISorting))
                }
                checked={currentSorting === option.idShared}
                className="check-form cursor-pointer invisible"
              />
              {option.idShared}
            </label>
          );
        })}
      </ul>
    </div>
  );
};
