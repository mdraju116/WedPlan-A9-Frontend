
import Banner from "@/components/home/Banner";
import FeaturedServices from "@/components/home/FeaturedServices";
import ServiceCategories from "@/components/home/ServiceCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import WeddingGallery from "@/components/home/WeddingGallery";
import Testimonials from "@/components/home/Testimonials";
// import FinalCTA from "@/components/home/FinalCTA";
import Reveal from "@/components/home/Reveal";

export default function Home() {
    return (
        <>
            <Banner />
            <Reveal><FeaturedServices /></Reveal>
            <Reveal><ServiceCategories /></Reveal>
            <Reveal><WhyChooseUs /></Reveal>
            <Reveal><HowItWorks /></Reveal>
            <Reveal><WeddingGallery /></Reveal>
            <Reveal><Testimonials /></Reveal>
            {/* <Reveal><FinalCTA /></Reveal> */}
        </>
    );
}
