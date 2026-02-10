import { Route, Routes } from 'react-router-dom'
import { Footer, HamburgerMenu, NavBar, ProductInfo, ScrollToTop } from './components'
import { FavoritePage, HomePage, LoginPage } from './pages'
import BasketPage from './pages/basketPage'

function App() {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <HamburgerMenu />
            <main style={{paddingTop: '10vh', paddingBottom: '100vh'}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />
                    <Route path="/FavoritePage" element={<FavoritePage />} />
                    <Route path='/products/:productName' element={<ProductInfo />} />
                    <Route path='/basketPage' element={<BasketPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
