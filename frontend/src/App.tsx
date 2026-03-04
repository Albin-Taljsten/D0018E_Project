import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, HamburgerMenu, NavBar, ProductInfo, ScrollToTop, OrderInfo, type Product } from './components'
import { FavoritePage, HomePage, LoginPage, OrderPage, ModerationPage } from './pages'
import BasketPage from './pages/basketPage'
import { useState } from 'react'
import CategoryGloves from './pages/CategoryGloves'
import CategorySkis from './pages/CategorySkis'
import CategorySnowboards from './pages/CategorySnowboards'
import CategoryHelmets from './pages/CategoryHelmets'
import CategorySkiBoots from './pages/CategorySkiBoots'
import CategorySnowBoots from './pages/CategorySnowBoots'

function App() {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const location = useLocation();

    return (
        <div className='d-flex flex-column min-vh-100'>
            <ScrollToTop />
            <NavBar setFavorites={setFavorites}/>
            <HamburgerMenu />

            <main className='flex-grow-1' style={{paddingTop: '10vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage setFavorites={setFavorites}/>} />
                    <Route path="/LoginPage" element={<LoginPage />} />

                    <Route path="/FavoritePage" element={<FavoritePage favorites={favorites} setFavorites={setFavorites}/>} />

                    <Route path='/products/:product_id' element={<ProductInfo key={location.pathname} favorites={favorites} setFavorites={setFavorites}/>} />
                    <Route path='/basketPage' element={<BasketPage />} />

                    <Route path='/orders' element={<OrderPage />} />
                    <Route path='/orders/:id' element={<OrderInfo key={location.pathname}/>} />

                    <Route path='/skis' element={<CategorySkis />}/>
                    <Route path='/snowboards' element={<CategorySnowboards />}/>
                    <Route path='/gloves' element={<CategoryGloves />}/>
                    <Route path='/helmets' element={<CategoryHelmets />}/>
                    <Route path='/ski_boots' element={<CategorySkiBoots />}/>
                    <Route path='/snow_boots' element={<CategorySnowBoots />}/>

                    <Route path='/moderation' element= {<ModerationPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}

export default App
