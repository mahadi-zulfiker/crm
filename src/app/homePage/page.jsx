"use client"
import React, { useState } from 'react'
import AboutUs from "@/components/About_Us";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Vendors from "@/components/vendors";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AllJobsHomePage from '@/components/allJobsHomePage';
import ContactUsHomePage from '@/components/ContactHomePage';
import BlogsHomePage from '@/components/BlogsHomePage';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Achievements from '@/components/Achievements';
import SmallMighty from '@/components/SmallMighty';
import JobSchedule from '@/components/JobSchedule';
import Brief from '@/components/Brief';
import WhatWeOfferSection from '@/components/HomeS';
import StickyHeader from '@/components/StickyHeader';
import Clients from '@/components/Clients';


function HomePage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  return (
    <div>
      <Navbar setHeaderHeight={setHeaderHeight} />
      <StickyHeader thresholdHeight={headerHeight} />
      <Banner />
      <Brief />
      <Clients />
      <WhatWeOfferSection />
      {/* <Services /> */}
      {/* <BlogsHomePage /> */}
      {/* <Benefits /> */}
      {/* <JobSchedule /> */}
      
      <Achievements />
      <Testimonials />
      {/* <SmallMighty /> */}
      <ContactUsHomePage />
      {/* <Vendors /> */}
      <Footer />
    </div>
  )
}

export default HomePage