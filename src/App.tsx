import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import WeddingInfo from './components/WeddingInfo'
import Dresscode from './components/Dresscode'
import PhotoCarousel from './components/PhotoCarousel'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <WeddingInfo />
        <Dresscode />
        <PhotoCarousel />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}

export default App
