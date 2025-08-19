import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProductEditorPage from "./pages/productEditorPage";
import Header from "./components/header";
import Footer from "./components/footer";
import ContactPage from "./pages/contactPage";
import AboutPage from "./pages/aboutPage";
import BraceletsPage from "./pages/products/BraceletsPage";
import AtebasPage from "./pages/products/AtebasPage";
import BeadAccessoriesPage from "./pages/products/BeadAccessoriesPage";
import AnkletsPage from "./pages/products/AnkletsPage";
import { CartProvider } from "./context/cartContext"; 
import CartPage from "./pages/cartPage";

function App() {
  return (
    <CartProvider> 
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<ProductEditorPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products/bracelets" element={<BraceletsPage />} />
          <Route path="/products/atebas" element={<AtebasPage />} />
          <Route
            path="/products/beadAccessories"
            element={<BeadAccessoriesPage />}
          />
          <Route path="/products/anklets" element={<AnkletsPage />} />
          <Route path="/cart" element={<CartPage />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
