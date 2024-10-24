import { ChangeEvent, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addOrDeleteFilter } from "../features/FilterAndSorting/filterSortingSlice";
import { openOrClose } from "../features/FilterSidebar/filterSidebarSlice";
import { Filters, OptionsFilter } from "../moduls";
import { motion } from "framer-motion";

export const FilterBtnSidebar = ({
                                   tag,
                                   name,
                                   options,
                                 }: {
  tag: string;
  name: string;
  options: OptionsFilter[];
}) => {
  const { areTheyOpenSidebar } = useSelector(
      (store: RootState) => store.filterSidebar
  );
  const { addedFilters } = useSelector(
      (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();
  const section = useRef<HTMLDivElement | null>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openOrClose(e.currentTarget.name));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addOrDeleteFilter(e.target.value as Filters));
  };

  return (
      <motion.div
          className={`border-b border-[#7e7e7e3d] pt-2 pb-6 px-4 overflow-hidden`}
          animate={{
            height: areTheyOpenSidebar[name] ? section.current?.scrollHeight : "45px",
            backgroundColor: areTheyOpenSidebar[name] ? "#7e7e7e3d" : "#7e7e7e0",
          }}
          transition={{ duration: 0.2 }}
          ref={section}
      >
        <button
            className="flex w-full transition duration-300 hover:pr-4 justify-between items-center"
            onClick={handleToggle}
            name={name}
        >
          <FaChevronDown
              className={`scale-x-[0.7] scale-y-[0.9] transition duration-300 ${
                  areTheyOpenSidebar[name] ? "rotate-180" : "rotate-0"
              }`}
          />
          {tag}
        </button>
        <ul className="text-base pr-3 transition-all duration-200 mt-5 grid gap-2">
          {options.map((option, index) => (
              <label
                  key={`${option.idSidebar}-${index}`}  // Combine idSidebar with index to ensure uniqueness
                  className="flex justify-start items-center gap-4 font-light cursor-pointer pl-4 relative"
                  htmlFor={option.idSidebar}
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
                    id={option.idSidebar}
                    value={option.idShared}
                    onChange={handleCheckboxChange}
                    checked={addedFilters.includes(option.idShared)}
                    className="check-form cursor-pointer invisible"
                />
                {option.idShared}
              </label>
          ))}
        </ul>
      </motion.div>
  );
};
