import {
  Filters,
  IBodyType,
  IDuration,
  IGroupSize,
  IPrice,
  ISorting,
  ITours,
} from "../moduls";
import { options } from "../utils/filterBarOptions.tsx";

function isOfTypeGroupSize(value: string): boolean {
  return options.groupSize.includes(value);
}

function isOfTypeDuration(value: string): boolean {
  return options.duration.includes(value);
}

function isOfTypePrice(value: string): boolean {
  return options.price.includes(value);
}

function isOfTypeTourType(value: string): boolean {
  return options.tourType.includes(value);
}


function whichType(value: string): "groupSize" | "duration" | "price" | "tourType" {
  if (isOfTypeGroupSize(value)) return "groupSize";
  if (isOfTypeDuration(value)) return "duration";
  if (isOfTypePrice(value)) return "price";
  if (isOfTypeTourType(value)) return "tourType";
  throw new Error("Invalid filter value");
}

function areAllItemsOfTypes(arr: string[]) {
  let trueOrFalse = false;
  for (let i = 0; i < 4; i++) {
    trueOrFalse = arr.every((item) => options[i].includes(item));
    if (trueOrFalse) {
      break;
    }
  }
  return trueOrFalse;
}

function separatePerType(arr: Filters[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    let found = false;

    for (let j = 0; j < result.length; j++) {
      const subarray = result[j];
      if (
        subarray.length > 0 &&
        whichType(subarray[0]) === whichType(element)
      ) {
        subarray.push(element);
        found = true;
        break;
      }
    }

    if (!found) {
      result.push([element]);
    }
  }
  return result;
}
function findCommonElements(arrays: ITours[][]) {
  if (arrays.length < 2) {
    return [...arrays[0]];
  }

  const firstArray = new Set(arrays[0]);

  const commonElements = [...firstArray].filter((item) =>
    arrays.slice(1).every((subarray) => subarray.includes(item))
  );

  return commonElements;
}
function bodyType(type: IBodyType, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  if (type === "Planet") {
    return tours.filter((tour) => tour.isPlanet === true);
  }
  return tours.filter((tour) => tour.isPlanet === false);
}

function price(type: IPrice, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  switch (type) {
    case "$300k or less":
      return tours.filter((tour) => (tour.price as number) < 300001);
    case "$301k - $499k":
      return tours.filter(
        (tour) =>
          (tour.price as number) > 300000 && (tour.price as number) < 500000
      );
    case "$500k - $799k":
      return tours.filter(
        (tour) =>
          (tour.price as number) > 499000 && (tour.price as number) < 800000
      );
    case "$800k or more":
      return tours.filter((tour) => (tour.price as number) > 799000);
  }
}

function duration(type: IDuration, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  switch (type) {
    case "60 days or less":
      return tours.filter((tour) => Number(tour.duration) < 61);
    case "61 - 99 days":
      return tours.filter(
        (tour) => Number(tour.duration) > 60 && Number(tour.duration) < 100
      );
    case "100 - 140 days":
      return tours.filter(
        (tour) => Number(tour.duration) > 99 && Number(tour.duration) < 141
      );
    case "141 days or more":
      return tours.filter((tour) => Number(tour.duration) > 140);
  }
}

function groupSize(type: IGroupSize, tours: ITours[] | undefined) {
  if (!tours || !tours.length) return;
  switch (type) {
    case "40 people or less":
      return tours.filter((tour) => tour.groupSize === "20-40");
    case "41 - 80 people":
      return tours.filter(
        (tour) => tour.groupSize === "40-60" || tour.groupSize === "60-80"
      );
    case "81 people or more":
      return tours.filter(
        (tour) => tour.groupSize === "80-100" || tour.groupSize === "100-120"
      );
  }
}
function singleFilter(filter: string, tours: ITours[]): ITours[] {
  if (isOfTypeGroupSize(filter)) {
    return tours.filter((tour) => {
      switch (filter) {
        case "Less than 10":
          return tour.groupSize < 10;
        case "11 - 15 Persons":
          return tour.groupSize >= 11 && tour.groupSize <= 15;
        case "More than 16":
          return tour.groupSize > 16;
        default:
          return false;
      }
    });
  }

  if (isOfTypeDuration(filter)) {
    return tours.filter((tour) => {
      switch (filter) {
        case "Less than 7 Days":
          return tour.duration < 7;
        case "8-10 Days":
          return tour.duration >= 8 && tour.duration <= 10;
        case "11 - 15 Days":
          return tour.duration >= 11 && tour.duration <= 15;
        case "More than 15 Days":
          return tour.duration > 15;
        default:
          return false;
      }
    });
  }

  if (isOfTypePrice(filter)) {
    return tours.filter((tour) => {
      switch (filter) {
        case "Less than Rs. 50,000":
          return tour.price < 50000;
        case "Rs. 50,000 - Rs. 99,999":
          return tour.price >= 50000 && tour.price <= 99999;
        case "Rs. 100,000 - Rs. 149,999":
          return tour.price >= 100000 && tour.price <= 149999;
        case "More than Rs. 150,000":
          return tour.price > 150000;
        default:
          return false;
      }
    });
  }

  if (isOfTypeTourType(filter)) {
    return tours.filter((tour) => tour.tourType === filter);
  }

  return tours; // Return the unchanged array if no filter matches
}


function applyAllFilters(filtersToAdd: Filters[], originalTours: ITours[]) {
  if (!filtersToAdd || !originalTours) return;
  if (!filtersToAdd.length) {
    return originalTours;
  }
  if (areAllItemsOfTypes(filtersToAdd)) {
    return filtersToAdd
      .map((filter) => singleFilter(filter, originalTours))
      .flatMap((item) => item);
  }
  let groupedPerType = separatePerType(filtersToAdd);
  let selectedToursPerGroup = groupedPerType.map((group) =>
    group
      .map((filter) => singleFilter(filter, originalTours))
      .flatMap((item) => item)
  );
  let commonElem = findCommonElements(selectedToursPerGroup as ITours[][]);
  return commonElem;
}

function sort(sortingMethod: ISorting, tours: ITours[]) {
  let newArray = tours;
  switch (sortingMethod) {
    case "Featured":
      return newArray?.sort((a, b) => b.id - a.id);
    case "Price: Low to high":
      return newArray?.sort((a, b) => a.price - b.price);
      case "Rating: High to low":
        return newArray?.sort((a,b)=>b.avgreview - a.avgreview)
    case "Duration: Long to short":
      return newArray?.sort((a, b) => Number(b.duration) - Number(a.duration));
    case "Duration: Short to long":
      return newArray?.sort((a, b) => Number(a.duration) - Number(b.duration));
  }
}

export const filterAndSort = (
    addedFilters: Filters[],
    currentSorting: ISorting,
    tours: ITours[]
): ITours[] => {
  let filteredTours = tours;

  // Apply filters (like price, group size, etc.)
  addedFilters.forEach((filter) => {
    if (filter === "price") {
      filteredTours = filteredTours.filter(tour => tour.tourPrice < 50000); // Example filter logic
    }
    // Add other filters like group size, duration, etc.
  });

  // Apply sorting
  if (currentSorting === "PriceLowToHigh") {
    filteredTours = filteredTours.sort((a, b) => a.tourPrice - b.tourPrice);
  } else if (currentSorting === "PriceHighToLow") {
    filteredTours = filteredTours.sort((a, b) => b.tourPrice - a.tourPrice);
  } else if (currentSorting === "Rating") {
    filteredTours = filteredTours.sort((a, b) => b.tourRating - a.tourRating);
  }

  return filteredTours;
};

