'use client';

import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#465556]">
      <CustomCursor />
      <Preloader onComplete={() => setIsLoaded(true)} columnColor="#151b1c" />
      <div className="relative z-20">
        <Hero isLoaded={isLoaded} />
        <About />
        <Works />
        <Services />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
