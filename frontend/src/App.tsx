import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import FavoritePage from './pages/FavoritePage'
import Footer from './components/Footer'
import ProductInfo from './components/ProductInfo'
import ScrollToTop from './components/ScollToTop'
import BasketPage from './pages/basketPage'

function App() {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <main style={{paddingTop: '10vh', paddingBottom: '100vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Favorite" element={<FavoritePage />} />
                    <Route path='/products/:productName' element={<ProductInfo />} />
                    <Route path='/basket' element={<BasketPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
