import { IFilterBtn, ISortingOptions } from "../moduls";
import { nanoid } from "nanoid";

export const filterOptions: IFilterBtn[] = [
  {
    tag: "Group Size",
    name: "groupSize",
    options: [
      { idFull: "groupSize-10", idShared: "Upto 10" },
      { idFull: "groupSize-15", idShared: "Upto 15" },
      { idFull: "groupSize-25", idShared: "Upto 25" },
    ],
  },

];

export const sortingOptions: ISortingOptions[] = [
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Featured",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Price: Low to High",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Rating: High to Low",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Duration: Long to Short",
  },
  {
    idFull: nanoid(),
    idSidebar: nanoid(),
    idShared: "Duration: Short to Long",
  },
];
export const options = {
  groupSize: ["Upto 10", "Upto 15", "Upto 25"],
  duration: ["Less than 7 Days", "8-10 Days", "11 - 15 Days", "More than 15 Days"],
  price: [
    "Less than Rs. 50,000",
    "Rs. 50,000 - Rs. 99,999",
    "Rs. 100,000 - Rs. 149,999",
    "More than Rs. 150,000",
  ],
  tourType: ["On-road", "Off-road", "Mixed"],
};

