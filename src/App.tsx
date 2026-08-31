import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import UploadSection from './components/UploadSection'
import Schedule from './components/Schedule'
import GuestInfo from './components/GuestInfo'
import Dresscode from './components/Dresscode'
import PhotoCarousel from './components/PhotoCarousel'
import Contacts from './components/Contacts'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <UploadSection />
        <Schedule />
        <GuestInfo />
        <Dresscode />
        <PhotoCarousel />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

export default App
