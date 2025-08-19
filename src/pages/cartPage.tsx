import { useCart } from "../context/cartContext";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t("cart.title")}</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg">
          <p className="mb-4">{t("cart.empty")}</p>
          <Link
            to="/products/bracelets"
            className="bg-sunset text-white px-4 py-2 rounded hover:bg-berry transition"
          >
            {t("cart.shopNow")}
          </Link>
        </div>
      ) : (
        <div>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{t(item.name)}</h2>
                    <p className="text-gray-600">
                      {item.price} DH × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("cart.total")}: {total} DH</h2>
            <div className="space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                {t("cart.clear")}
              </button>
              <button
                className="bg-sunset text-white px-6 py-2 rounded hover:bg-berry transition"
              >
                {t("cart.checkout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
