import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext"; 
import LanguageSwitcher from "./languageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const [productsOpen, setProductsOpen] = useState(false);
  const { cart } = useCart(); 
  const navigate = useNavigate();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-sunset to-berry text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Fileor
        </Link>

        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className="hover:text-yellow-300 font-medium">
            {t("nav.home")}
          </NavLink>

          <NavLink to="/editor" className="hover:text-yellow-300 font-medium">
            {t("nav.customize")}
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setProductsOpen((prev) => !prev)}
              className="flex items-center hover:text-yellow-300 font-medium focus:outline-none"
              aria-expanded={productsOpen}
            >
              {t("nav.products")}
              {productsOpen ? (
                <ChevronUp size={18} className="ml-1" />
              ) : (
                <ChevronDown size={18} className="ml-1" />
              )}
            </button>
            {productsOpen && (
              <div className="absolute bg-white text-ink rounded shadow-lg mt-2 w-48 z-50">
                <Link to="/products/bracelets" className="block px-4 py-2 hover:bg-sand">
                  {t("nav.brazilianBracelets")}
                </Link>
                <Link to="/products/atebas" className="block px-4 py-2 hover:bg-sand">
                  {t("nav.atebas")}
                </Link>
                <Link to="/products/beadAccessories" className="block px-4 py-2 hover:bg-sand">
                  {t("nav.beadAccessories")}
                </Link>
                <Link to="/products/anklets" className="block px-4 py-2 hover:bg-sand">
                  {t("nav.anklets")}
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/about" className="hover:text-yellow-300 font-medium">
            {t("nav.about")}
          </NavLink>
          <NavLink to="/contact" className="hover:text-yellow-300 font-medium">
            {t("nav.contact")}
          </NavLink>
        </nav>


        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/cart")}
            className="relative hover:text-yellow-300 focus:outline-none"
          >
            <ShoppingCart size={26} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </button>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
