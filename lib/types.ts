export type AccommodationType = "Single Room" | "Self Contained" | "Room & Parlour" | "2 Bedroom" | "3 Bedroom";

export type Property = {
  id: string;
  name: string;
  type: AccommodationType;
  location: string;
  price: number;
  distance: number;
  facilities: string[];
  description: string;
  images: string[];
  featured: boolean;
  listed: string;
};

export type Filters = {
  query: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  type: string;
  facilities: string[];
  maxDistance: string;
  sort: string;
};
