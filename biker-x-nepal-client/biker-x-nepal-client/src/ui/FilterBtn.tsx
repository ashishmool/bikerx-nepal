import { ChangeEvent } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrDeleteFilter,
  openOneOfThem,
  setSelectedFilters, // Import this
} from "../features/FilterAndSorting/filterSortingSlice";
import { Filters, OptionsFilter } from "../moduls";

export const FilterBtn = ({
                              tag,
                              name,
                              options,
                          }: {
    tag: string;
    name: string;
    options: OptionsFilter[];
}) => {
    const { areTheyOpen, addedFilters, selectedFilters } = useSelector(
        (store: RootState) => store.filterSorting
    );
    const dispatch = useDispatch();

    const handleFilterChange = (option: OptionsFilter) => {
        const isSelected = addedFilters.includes(option.idShared);

        dispatch(addOrDeleteFilter(option.idShared));

        // Mapping group size to a maxParticipants filter key
        const filterKey = name === "groupSize" ? "maxParticipants" : name;

        // Determine the maxParticipants value based on the selected option
        let maxParticipants;
        if (option.idShared === "Upto 10") {
            maxParticipants = 10;
        } else if (option.idShared === "Upto 15") {
            maxParticipants = 15;
        } else if (option.idShared === "Upto 25") {
            maxParticipants = 25;
        }

        dispatch(
            setSelectedFilters({
                ...selectedFilters,
                [filterKey]: isSelected ? undefined : maxParticipants, // Set maxParticipants or undefined if unchecked
            })
        );
    };

    return (
        <div
            className={`relative h-[60px] w-full bg-transparent hidden full:block z-[1] ${
                areTheyOpen[name] ? 'overflow-visible' : 'overflow-hidden'
            }`}
        >
        <button
            className="flex items-center justify-between text-left border border-[#ffffff34] h-[100%]
           transition-all duration-300 hover:underline px-[20px] bg-black w-full"
            onClick={(e) =>
                dispatch(openOneOfThem((e.target as HTMLButtonElement).name))
            }
            name={name}
        >
          {tag}
          <FaChevronDown
              className={`text-[#fff] scale-x-[0.6] scale-y-[0.8] transition-all duration-300
        ${areTheyOpen[name] ? "rotate-0" : "rotate-180"}`}
              style={{ pointerEvents: "none" }}
          />
        </button>
        <ul className="border border-[#ffffff34] mt-3 bg-black absolute w-full p-3 z-[2] flex flex-col gap-2">
          {options.map((option) => {
            return (
                <label
                    key={option.idFull}
                    className="flex justify-start items-center gap-4 font-light cursor-pointer relative"
                    htmlFor={option.idFull}
                >
              <span className={`h-5 w-5 rounded-full border-2 absolute`}>
                <span
                    className={`absolute inset-1 rounded-full ${
                        addedFilters.includes(option.idShared)
                            ? "bg-white"
                            : "bg-transparent"
                    }`}
                ></span>
              </span>
                  <input
                      type="checkbox"
                      id={option.idFull}
                      value={option.idShared}
                      onChange={() => handleFilterChange(option)} // Update this line
                      checked={addedFilters.includes(option.idShared)}
                      className="check-form cursor-pointer border invisible"
                  />
                  {option.idShared}
                </label>
            );
          })}
        </ul>
      </div>
  );
};
