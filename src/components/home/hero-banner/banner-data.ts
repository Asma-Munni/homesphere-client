export interface BannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
}


export const banners: BannerItem[] = [
  {
    id: 1,
    image: "/Images/banner.png",
    title: "Find Your Perfect Home",
    description:
      "Discover premium properties designed for your lifestyle.",
  },

  {
    id: 2,
    image: "/Images/banner2.png",
    title: "A Place You Can Call Home",
    description:
      "Explore beautiful spaces from trusted property holders.",
  },

  {
    id: 3,
    image: "/Images/banner3.png",
    title: "Live Better, Choose Better",
    description:
      "Smart property solutions for modern living.",
  },


  // Future images add here

  // {
  //   id: 4,
  //   image: "/Images/banner4.png",
  //   title: "Luxury Living",
  //   description: "Experience comfort and elegance.",
  // },

];