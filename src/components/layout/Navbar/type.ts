export interface CategoryItem {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

// export interface Category {
//   //   id: string;
//   name: string;
//   featured: CategoryItem[];
//   sections: CategorySection[];
// }

export interface CategorySectionItems {
  href: string;
  name: string;
}
export interface CategorySection {
  id: string;
  name: string;
  items: CategorySectionItems[];
}
export interface Page {
  name: string;
  href: string;
}

// export interface Navigation {
//   categories: Category[];
//   pages: Page[];
// }

// export interface DesktopProps {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   navigation: Navigation;
// }
