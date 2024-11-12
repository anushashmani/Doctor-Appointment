import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

import DoctorsSection from "@/components/DoctorSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DoctorsSection isHome={true} />
    </div>
  );
}
