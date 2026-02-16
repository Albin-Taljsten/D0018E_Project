import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, HamburgerMenu, NavBar, ProductInfo, ScrollToTop, type Product } from './components'
import { FavoritePage, HomePage, LoginPage, OrderPage } from './pages'
import BasketPage from './pages/basketPage'
import { useState } from 'react'

function App() {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const location = useLocation();

    return (
        <>
            <ScrollToTop />
            <NavBar />
            <HamburgerMenu />
            <main style={{paddingTop: '10vh', paddingBottom: '100vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />

                    <Route path="/FavoritePage" element={<FavoritePage favorites={favorites}/>} />

                    <Route path='/products/:productName' element={<ProductInfo key={location.pathname} favorites={favorites} setFavorites={setFavorites}/>} />
                    <Route path='/basketPage' element={<BasketPage />} />

                    <Route path='/orders' element={<OrderPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
