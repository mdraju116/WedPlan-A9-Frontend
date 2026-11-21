
import Banner from "@/components/home/Banner";
import FeaturedServices from "@/components/home/FeaturedServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import WeddingGallery from "@/components/home/WeddingGallery";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
    return (
        <>
            <Banner />
            <FeaturedServices />
            <WhyChooseUs />
            <HowItWorks />
            <WeddingGallery />
            <Testimonials />
            <FinalCTA />
        </>
    );
}
