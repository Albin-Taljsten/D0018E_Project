import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import FavoritePage from './pages/FavoritePage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <main style={{paddingTop: '10vh', paddingBottom: '100vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Favorite" element={<FavoritePage />} />
                    <Route path="/About" element={<AboutPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
