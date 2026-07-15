import Faq from "@/components/home/faq/page";
import FeaturedProperties from "@/components/home/featured-properties/page";
import HeroBanner from "@/components/home/hero-banner/page";
import Newsletter from "@/components/home/newsletter/page";
import PropertyCategories from "@/components/home/property-categories/page";
import PropertyStatistics from "@/components/home/property-statistics/page";
import WhyChooseUs from "@/components/home/why-choose-us/page";



export default function Home() {
  return (
    <div >
      <HeroBanner></HeroBanner>
      <PropertyCategories />
      <FeaturedProperties />
      <WhyChooseUs />
      <PropertyStatistics />
      <Faq />
      <Newsletter />
    </div>
  );
}
