import WhyLP from './Components/WhyLP.jsx'
import WhatYouWillLearn from './Components/WhatYouWillLearn.jsx'
import Features from './Components/Features.jsx'
import Footer from './Components/Footer.jsx'
import Hero from './Components/Hero.jsx'
import LearnSmarter from './Components/LearnSmarter.jsx'
import Testimonials from './Components/Testimonials.jsx'
import WhatYouGetAndWhoFor from './Components/Whatyougetandwhofor.jsx'
import JourneySections from "./Components/Journeysections.jsx"
import AboutMentor from './Components/Aboutmentor.jsx'
import TestimonialCarousel from './Components/Testimonialcarousel.jsx'
import ClientTestimonial from './Components/ClientTestimonial.jsx'

function App() {
  return (
    <>
      <Hero />
      <TestimonialCarousel />
      <ClientTestimonial />
      <Features />
      <WhyLP />
      <WhatYouWillLearn />
      <AboutMentor />
      <Testimonials />
      <WhatYouGetAndWhoFor />
      <LearnSmarter />
      <JourneySections />
      <Footer />
    </>
  )
}

export default App