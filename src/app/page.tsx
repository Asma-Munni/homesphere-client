import Faq from "@/components/home/faq/page";
import HeroBanner from "@/components/home/hero-banner/page";
import Newsletter from "@/components/home/newsletter/page";
import WhyChooseUs from "@/components/home/why-choose-us/page";
import { FaQ } from "react-icons/fa6";


export default function Home() {
  return (
    <div >
      <HeroBanner></HeroBanner>
      <WhyChooseUs />
      <Faq />
      <Newsletter />
    </div>
  );
}
