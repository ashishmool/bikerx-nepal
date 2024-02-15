import { IFilterBtn, ISortingOptions } from "../moduls";
import { nanoid } from "nanoid";

export const filterOptions: IFilterBtn[] = [
  {
    tag: "Group Size",
    name: "groupSize",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Less than 10",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "11 - 15 Persons",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "More than 16",
      },
    ],
  },
  {
    tag: "Duration",
    name: "duration",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Less than 7 Days",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "8-10 Days",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "11 - 15 Days",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "More than 15 Days",
      },
    ],
  },
  {
    tag: "Price",
    name: "price",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Less than Rs. 50,000",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Rs. 50,000 - Rs. 99,999",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Rs. 100,000 - Rs. 149,999",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "More than Rs. 150,000",
      },
    ],
  },
  {
    tag: "Tour Type",
    name: "tourType",
    options: [
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "On-road",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Off-road",
      },
      {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Mixed",
      },
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
export const options = [
  ["On-road", "Off-road", "Mixed"],
  ["Less than 7 Days", "8-10 Days", "11 - 15 Days", "More than 15 Days"],
  ["Less than 10", "11 - 15 Persons", "More than 16"],
  ["Less than Rs. 50,000", "Rs. 50,000 - Rs. 99,999", "Rs. 100,000 - Rs. 149,999", "More than Rs. 150,000"],
];
