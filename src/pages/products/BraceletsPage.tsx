import { useTranslation } from "react-i18next";
import { useCart } from "../../context/cartContext"; 

const bracelets = [
  {
    id: 1,
    name: "bracelet.sun",
    price: 80,
    image: "https://tse2.mm.bing.net/th/id/OIP.jamHpOzQJyFU52djmHQhrAHaFj?pid=Api",
  },
  {
    id: 2,
    name: "bracelet.ocean",
    price: 90,
    image: "https://tse2.mm.bing.net/th/id/OIP.RhecJyejoZ0rVZUpS9_R9QHaFs?pid=Api",
  },
];

export default function BraceletsPage() {
  const { t } = useTranslation();
 const { addToCart } = useCart(); 

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t("products.bracelets")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {bracelets.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-lg shadow border border-sand hover:shadow-lg transition"
          >
            <img
              src={b.image}
              alt={b.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{t(b.name)}</h2>
              <p className="text-sunset font-bold mb-4">{b.price} DH</p>
              <button
                className="bg-sunset text-white px-4 py-2 rounded hover:bg-berry transition"
                onClick={() => addToCart({ ...b, price: b.price.toString() })}
              >
                🛒 {t("products.addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
