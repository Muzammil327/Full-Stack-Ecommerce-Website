interface CatgeoryType {
  id: string;
  name: string;
  subCategories: SubCatgeoryType[];
}
interface SubCatgeoryType {
  id: string;
  name: string;
  tags: TagType[];
}
interface TagType {
  id: string;
  name: string;
}

interface CatTypes {
  id: string;
  name: string;
}

export const Category: CatTypes[] = [
  {
    id: "women fashion",
    name: "Women Fashion",
  },
  {
    id: "men fashion",
    name: "Men Fashion",
  },
  {
    id: "men and women fashion",
    name: "Men and Women Fashion",
  },
  {
    id: "electronics",
    name: "Electronics",
  },
  {
    id: "home & lifestyle",
    name: "Home & LifeStyle",
  },
];

export const SubCategory: CatTypes[] = [
  {
    id: "clothing",
    name: "Clothing",
  },
  {
    id: "shoes",
    name: "Shoes",
  },
  {
    id: "shirt",
    name: "Shirt",
  },
];

export const Items: CatTypes[] = [
  { id: "brands", name: "Brands" },
  { id: "nike", name: "Nike" },
  { id: "jordan", name: "Jordan" },
  { id: "polo shirt", name: "Polo Shirt" },
];

export const categories: CatgeoryType[] = [
  {
    id: "men fashion",
    name: "Men Fashion",
    subCategories: [
      {
        id: "shoes",
        name: "Shoes",
        tags: [{ id: "jordan", name: "Jordan" }],
      },
      {
        id: "shirt",
        name: "Shirt",
        tags: [{ id: "polo", name: "Polo" }],
      },
    ],
  },
  {
    id: "women fashion",
    name: "Women Fashion",
    subCategories: [
      {
        id: "shoes",
        name: "Shoes",
        tags: [{ id: "jordan", name: "Jordan" }],
      },
    ],
  },
  {
    id: "child fashion",
    name: "Child Fashion",
    subCategories: [
      {
        id: "shoes",
        name: "Shoes",
        tags: [{ id: "jordan", name: "Jordan" }],
      },
    ],
  },
  {
    id: "health beauty",
    name: "Health & Beauty",
    subCategories: [
      {
        id: "fitness & exercise",
        name: "Fitness & Exercise",
        tags: [{ id: "brands", name: "Brands" }],
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    subCategories: [
      {
        id: "audio accessories",
        name: "Audio Accessories",
        tags: [
          { id: "airpods", name: "Airpods" },
          { id: "handfree", name: "Handfree" },
          { id: "headphones", name: "Headphones" },
          { id: "neckband", name: "Neckbank" },
          { id: "microphones", name: "Microphones" },
          { id: "speakers", name: "Speakers" },
        ],
      },
      {
        id: "tv accessories",
        name: "TV Accessories",
        tags: [],
      },
      {
        id: "computer accessories",
        name: "Computer Accessories",
        tags: [
          { id: "mouse", name: "Mouse" },
          { id: "mouse pad", name: "Mouse Pad" },
          { id: "keyboard", name: "Keyboard" },
          { id: "usb", name: "USB" },
          { id: "charger", name: "Charger" },
        ],
      },
      {
        id: "wearable accessories",
        name: "Wearable Accessories",
        tags: [{ id: "watches", name: "Watches" }],
      },
    ],
  },
  {
    id: "home & lifestyle",
    name: "Home & LifeStyle",
    subCategories: [
      {
        id: "kitchen accessories",
        name: "Kitchen Accessories",
        tags: [
          { id: "slicer", name: "Slicer" },
          { id: "plates", name: "Plates" },
          { id: "brands", name: "Brands" },
        ],
      },
      {
        id: "heating cooling accessories",
        name: "Heating & Cooling",
        tags: [{ id: "slicer", name: "Slicer" }],
      },
      {
        id: "cleaning dusting accessories",
        name: "Cleaning & Dusting",
        tags: [{ id: "slicer", name: "Slicer" }],
      },
      {
        id: "home decor",
        name: "Home Decor",
        tags: [{ id: "slicer", name: "Slicer" }],
      },
      {
        id: "travel accessories",
        name: "Travel Accessories",
        tags: [{ id: "slicer", name: "Slicer" }],
      },
      {
        id: "bathroom accessories",
        name: "Bathroom Accessories",
        tags: [{ id: "slicer", name: "Slicer" }],
      },
    ],
  },
];
