import './Home.css'
import Navbar from '@/components/ui/Navbar'
import Card from '../components/ui/ProfileCard'
import DealsSection from '@/components/ui/DealsSection'
import Clothes from '../components/ui/Clothes'
import Footer from "../components/ui/Footer.jsx";
import { Sidebar } from 'lucide-react'
export default function Home() {
  return (
    <>
       <Navbar/>
      
      <Card/>
      <DealsSection/>
      <Clothes/>
      <Footer />

    </>
    
  )
}
