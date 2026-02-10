import { Route, Routes } from 'react-router-dom'
import { Footer, ProductInfo, ScrollToTop } from './components/misc'
import { HamburgerMenu, NavBar } from './components'
import { FavoritePage, HomePage, LoginPage } from './pages'

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
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
