import { IFilterBtn, ISortingOptions } from "../moduls"; // Assuming you have this defined in your moduls
import { nanoid } from "nanoid";

// Define filter options specifically for products
export const productFilterOptions: IFilterBtn[] = [
    {
        tag: "Size",
        name: "size",
        options: [
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "S",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "M",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "L",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "XL",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "One Size",
            },
        ],
    },
    {
        tag: "Color",
        name: "colour",
        options: [
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "Black",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "Brown",
            },
            {
                idFull: nanoid(),
                idSidebar: nanoid(),
                idShared: "Clear",
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
];

// Define sorting options specifically for products
export const productSortingOptions: ISortingOptions[] = [
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
        idShared: "Price: High to Low",
    },
    {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Size: Small to Large",
    },
    {
        idFull: nanoid(),
        idSidebar: nanoid(),
        idShared: "Size: Large to Small",
    },
];

// A default array for product options (can be used for general selections in the UI)
export const productOptions = [
    ["S", "M", "L", "XL", "One Size"], // Sizes
    ["Black", "Brown", "Clear"],       // Colors
    ["Less than Rs. 50,000", "Rs. 50,000 - Rs. 99,999", "Rs. 100,000 - Rs. 149,999", "More than Rs. 150,000"], // Prices
];
