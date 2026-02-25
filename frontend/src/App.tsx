import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, HamburgerMenu, NavBar, ProductInfo, ScrollToTop, OrderInfo, type Product } from './components'
import { FavoritePage, HomePage, LoginPage, OrderPage } from './pages'
import BasketPage from './pages/basketPage'
import { useState } from 'react'
import CategoryWoman from './pages/CategoryWoman'
import CategoryMan from './pages/CategoryMan'
import CategoryChildren from './pages/CategoryChildren'

function App() {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const location = useLocation();

    return (
        <>
            <ScrollToTop />
            <NavBar setFavorites={setFavorites}/>
            <HamburgerMenu />
            <main style={{paddingTop: '10vh', paddingBottom: '100vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage setFavorites={setFavorites}/>} />
                    <Route path="/LoginPage" element={<LoginPage />} />

                    <Route path="/FavoritePage" element={<FavoritePage favorites={favorites} setFavorites={setFavorites}/>} />

                    <Route path='/products/:product_id' element={<ProductInfo key={location.pathname} favorites={favorites} setFavorites={setFavorites}/>} />
                    <Route path='/basketPage' element={<BasketPage />} />

                    <Route path='/orders' element={<OrderPage />} />
                    <Route path='/orders/:id' element={<OrderInfo key={location.pathname}/>} />

                    <Route path='/women' element={<CategoryWoman />}/>
                    <Route path='/men' element={<CategoryMan />}/>
                    <Route path='/children' element={<CategoryChildren />}/>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
